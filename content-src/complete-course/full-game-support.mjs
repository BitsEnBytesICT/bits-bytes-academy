export const transitions = `def next_state(state, action, left, right, target):
    if action == "restart":
        return "serve"
    if state == "serve" and action == "space":
        return "playing"
    if state == "playing" and action == "point":
        if left >= target or right >= target:
            return "won"
        return "serve"
    return state
`;
export const scoring = `def score_miss(state, x, left, right, target):
    if state != "playing":
        return state, left, right
    if x < -6:
        right += 1
    elif x > 646:
        left += 1
    else:
        return state, left, right
    return next_state(state, "point", left, right, target), left, right
`;
export const paddles = `class Paddle:
    def __init__(self, x, y, height=60):
        self.x = x
        self.y = y
        self.height = height

    def move(self, up, down, dt):
        if up:
            self.y -= 240 * dt
        if down:
            self.y += 240 * dt
        self.y = max(0, min(400 - self.height, self.y))

    def rect(self):
        return pygame.Rect(self.x, self.y, 10, self.height)

def reflect(x, y, vx, paddle):
    ball = pygame.Rect(x - 6, y - 6, 12, 12)
    target = pygame.Rect(paddle)
    if ball.colliderect(target):
        if target.centerx < 320 and vx < 0:
            return target.right + 6, -vx
        if target.centerx >= 320 and vx > 0:
            return target.left - 6, -vx
    return x, vx
`;
export const persistence = `def load_target(filename):
    try:
        with open(filename, encoding="utf-8") as handle:
            settings = json.load(handle)
    except (FileNotFoundError, json.JSONDecodeError):
        return 5
    if not isinstance(settings, dict):
        return 5
    value = settings.get("target", 5)
    if type(value) is int and 1 <= value <= 21:
        return value
    return 5

def save_result(filename, left, right):
    with open(filename, "w", encoding="utf-8") as handle:
        json.dump({"left": left, "right": right}, handle, indent=2)
`;
export const pause = `class PauseControl:
    def __init__(self):
        self.paused = False

    def handle_key(self, key):
        if key == pygame.K_p:
            self.paused = not self.paused

    def should_update(self, state):
        return state == "playing" and not self.paused

    def reset(self):
        self.paused = False
`;
export const fullMain = `# Supplied match fixture. Edit the named responsibility in game.py.
import asyncio
import pygame
import game

async def main():
    pygame.init()
    screen = pygame.display.set_mode((640, 400))
    clock = pygame.time.Clock()
    font = pygame.font.Font(None, 24)
    left = game.Paddle(20, 170)
    right = game.Paddle(610, 170)
    control = game.PauseControl()
    target = game.load_target("settings.json")
    state = "serve"
    left_score, right_score = 0, 0
    x, y, vx, vy = 320.0, 200.0, 200.0, 100.0
    running = True
    while running:
        dt = min(clock.tick() / 1000, 0.05)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    running = False
                if event.key == pygame.K_SPACE:
                    state = game.next_state(state, "space", left_score, right_score, target)
                if event.key == pygame.K_r:
                    state = game.next_state(state, "restart", left_score, right_score, target)
                    left_score, right_score = 0, 0
                    x, y, vx, vy = 320.0, 200.0, 200.0, 100.0
                    control.reset()
                control.handle_key(event.key)
        keys = pygame.key.get_pressed()
        if control.should_update(state):
            left.move(keys[pygame.K_w], keys[pygame.K_s], dt)
            right.move(keys[pygame.K_UP], keys[pygame.K_DOWN], dt)
            x += vx * dt
            y += vy * dt
            if y <= 6 and vy < 0:
                y, vy = 6, -vy
            elif y >= 394 and vy > 0:
                y, vy = 394, -vy
            x, vx = game.reflect(x, y, vx, tuple(left.rect()))
            x, vx = game.reflect(x, y, vx, tuple(right.rect()))
            state, left_score, right_score = game.score_miss(state, x, left_score, right_score, target)
            if state != "playing":
                x, y, vx, vy = 320.0, 200.0, 200.0, 100.0
        screen.fill((16, 23, 39))
        pygame.draw.rect(screen, (235, 240, 250), left.rect())
        pygame.draw.rect(screen, (235, 240, 250), right.rect())
        pygame.draw.circle(screen, (255, 170, 40), (int(x), int(y)), 6)
        label = f"{left_score} : {right_score}   / {target}   {state}"
        if control.paused:
            label += "   PAUSED"
        screen.blit(font.render(label, True, (235, 240, 250)), (160, 20))
        screen.blit(font.render("W/S | Up/Down | Space serve | P pause | R restart", True, (235, 240, 250)), (80, 372))
        pygame.display.flip()
        await asyncio.sleep(1 / 60)
    game.save_result("result.json", left_score, right_score)
    pygame.quit()

asyncio.run(main())
`;
export function matchFiles(overrides = {}) {
  const parts = {
    transitions,
    scoring,
    paddles,
    persistence,
    pause,
    ...overrides,
  };
  return {
    "main.py": fullMain,
    "game.py":
      "import pygame\nimport json\n\n" + Object.values(parts).join("\n"),
    "settings.json": '{\n  "target": 3\n}\n',
  };
}
