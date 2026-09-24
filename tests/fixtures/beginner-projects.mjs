// Verification implementations, never installed as learner project starters.
export const calculatorReference = {
  "main.py": `def read_number(prompt):
    while True:
        try:
            text = input(prompt).strip().lower()
        except EOFError:
            return None
        if text == "quit":
            return None
        try:
            return float(text)
        except ValueError:
            print("Try a number")

def calculate(left, right, operation):
    if operation == "+":
        return left + right
    if operation == "-":
        return left - right
    if operation == "*":
        return left * right
    if operation == "/":
        if right == 0:
            return None
        return left / right
    return None

def main():
    while True:
        try:
            operation = input("Operation or quit: ").strip().lower()
        except EOFError:
            break
        if operation == "quit":
            break
        if operation != "+" and operation != "-" and operation != "*" and operation != "/":
            print("Unknown operation")
            continue
        left = read_number("First or quit: ")
        if left is None:
            break
        right = read_number("Second or quit: ")
        if right is None:
            break
        result = calculate(left, right, operation)
        if result is None:
            print("Cannot divide by zero")
        else:
            print(f"Result: {result}")
    print("Goodbye")

main()
`,
};
export const pongReference = {
  "rules.py": `import pygame

def move_paddle(y, up, down, dt):
    if up:
        y -= 240 * dt
    if down:
        y += 240 * dt
    return max(0, min(340, y))

def advance(x, y, vx, vy, left_y, right_y, left_score, right_score, dt):
    if vx == 0:
        return x, y, vx, vy, left_score, right_score
    x += vx * dt
    y += vy * dt
    if y <= 6 and vy < 0:
        y, vy = 6, -vy
    if y >= 394 and vy > 0:
        y, vy = 394, -vy
    ball = pygame.Rect(x - 6, y - 6, 12, 12)
    left = pygame.Rect(20, left_y, 10, 60)
    right = pygame.Rect(610, right_y, 10, 60)
    if ball.colliderect(left) and vx < 0:
        x, vx = left.right + 6, -vx
    if ball.colliderect(right) and vx > 0:
        x, vx = right.left - 6, -vx
    if x < -6:
        return 320.0, 200.0, 0.0, 0.0, left_score, right_score + 1
    if x > 646:
        return 320.0, 200.0, 0.0, 0.0, left_score + 1, right_score
    return x, y, vx, vy, left_score, right_score
`,
  "main.py": `import asyncio
import pygame
from rules import move_paddle, advance

async def main():
    pygame.init()
    screen = pygame.display.set_mode((640, 400))
    clock = pygame.time.Clock()
    font = pygame.font.Font(None, 32)
    x, y, vx, vy = 320.0, 200.0, 0.0, 0.0
    left_y, right_y = 170.0, 170.0
    left_score, right_score = 0, 0
    running = True
    while running:
        dt = min(clock.tick() / 1000, 0.05)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    running = False
                if event.key == pygame.K_SPACE and vx == 0:
                    vx, vy = 180.0, 90.0
        keys = pygame.key.get_pressed()
        left_y = move_paddle(left_y, keys[pygame.K_w], keys[pygame.K_s], dt)
        right_y = move_paddle(right_y, keys[pygame.K_UP], keys[pygame.K_DOWN], dt)
        x, y, vx, vy, left_score, right_score = advance(x, y, vx, vy, left_y, right_y, left_score, right_score, dt)
        screen.fill((16, 23, 39))
        pygame.draw.rect(screen, (235, 240, 250), (20, left_y, 10, 60))
        pygame.draw.rect(screen, (235, 240, 250), (610, right_y, 10, 60))
        pygame.draw.circle(screen, (255, 170, 40), (int(x), int(y)), 6)
        label = font.render(f"{left_score} : {right_score}", True, (235, 240, 250))
        screen.blit(label, (280, 20))
        pygame.display.flip()
        await asyncio.sleep(1 / 60)
    pygame.quit()

asyncio.run(main())
`,
};
