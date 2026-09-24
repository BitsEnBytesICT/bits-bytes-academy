import { S, F } from "./authoring.mjs";
export const preview = S(
  [],
  ["Run, observe, finish", "Voer uit, bekijk, rond af"],
  [
    "main.py supplies the browser entry point. Run opens a real pygame-ce preview; click it to focus the keyboard. Clicking elsewhere pauses play. Finish & check closes normally and checks your helper after at least one rendered frame. Stop cancels without grading. Run can start a fresh session afterward. Keep the supplied async definition and await asyncio.sleep(1 / 60): they let the browser draw and receive input. You are not expected to reproduce this infrastructure from memory.",
    "main.py levert het browserstartpunt. Uitvoeren opent een echt pygame-ce-voorbeeld; klik erop om het toetsenbord te activeren. Elders klikken pauzeert het spel. Afronden en controleren sluit normaal af en controleert je helper na minstens één getekend beeld. Stop annuleert zonder beoordeling. Uitvoeren kan daarna een nieuwe sessie starten. Behoud de meegeleverde async-definitie en await asyncio.sleep(1 / 60): die laten de browser tekenen en invoer ontvangen. Je hoeft deze infrastructuur niet uit je hoofd te schrijven.",
  ],
);
export const G = (name, args, check, options = {}) =>
  F(name, args, check, { module: "game", ...options });
export const frameCheck = "_rendered_frames > 0";
export function courtMain({
  setup = "",
  events = "",
  frame = "",
  draw = "screen.blit(game.court(640, 400, False), (0, 0))",
} = {}) {
  const indent = (s, n) =>
    s
      ? s
          .split("\n")
          .map((l) => " ".repeat(n) + l)
          .join("\n") + "\n"
      : "";
  return `# Browser entry point supplied by the course.\nimport asyncio\nimport pygame\nimport game\n\nasync def main():\n    pygame.init()\n    screen = pygame.display.set_mode((640, 400))\n    clock = pygame.time.Clock()\n    running = True\n${indent(setup, 4)}    while running:\n        dt = min(clock.tick() / 1000, 0.05)\n        for event in pygame.event.get():\n            if event.type == pygame.QUIT:\n                running = False\n            if event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE:\n                running = False\n${indent(events, 12)}        keys = pygame.key.get_pressed()\n${indent(frame, 8)}        screen.fill((16, 23, 39))\n${indent(draw, 8)}        pygame.display.flip()\n        await asyncio.sleep(1 / 60)\n    pygame.quit()\n\nasyncio.run(main())\n`;
}
export const courtFunction = `def court(width, height, highlight=False):\n    canvas = pygame.Surface((width, height))\n    canvas.fill((16, 23, 39))\n    pygame.draw.rect(canvas, (235, 240, 250), (20, height // 2 - 30, 10, 60))\n    pygame.draw.rect(canvas, (235, 240, 250), (width - 30, height // 2 - 30, 10, 60))\n    colour = (255, 170, 40) if highlight else (235, 240, 250)\n    pygame.draw.rect(canvas, colour, (width // 2 - 3, height // 2 - 3, 6, 6))\n    return canvas\n`;
export const rallyDraw = `pygame.draw.rect(screen, (235, 240, 250), (20, left_y, 10, 60))\npygame.draw.rect(screen, (235, 240, 250), (610, right_y, 10, 60))\npygame.draw.circle(screen, (255, 170, 40), (int(x), int(y)), 6)`;
export const rallySetup =
  "x, y = 320.0, 200.0\nvx, vy = 200.0, 100.0\nleft_y, right_y = 170.0, 170.0";
export const heldMovement = `if keys[pygame.K_w]:\n    left_y -= 240 * dt\nif keys[pygame.K_s]:\n    left_y += 240 * dt\nif keys[pygame.K_UP]:\n    right_y -= 240 * dt\nif keys[pygame.K_DOWN]:\n    right_y += 240 * dt\nleft_y = max(0, min(340, left_y))\nright_y = max(0, min(340, right_y))`;
export const rallyMain = courtMain({
  setup: rallySetup,
  frame:
    heldMovement +
    "\nx, y, vx, vy = game.step(x, y, vx, vy, dt, left_y, right_y)",
  draw: rallyDraw,
});
export const rallyStep = `def step(x, y, vx, vy, dt, left_y, right_y):\n    x += vx * dt\n    y += vy * dt\n    if y <= 6 and vy < 0:\n        y, vy = 6, -vy\n    elif y >= 394 and vy > 0:\n        y, vy = 394, -vy\n    ball = pygame.Rect(x - 6, y - 6, 12, 12)\n    left = pygame.Rect(20, left_y, 10, 60)\n    right = pygame.Rect(610, right_y, 10, 60)\n    if ball.colliderect(left) and vx < 0:\n        x, vx = 36, -vx\n    elif ball.colliderect(right) and vx > 0:\n        x, vx = 604, -vx\n    if x < -6 or x > 646:\n        x, y, vx, vy = 320.0, 200.0, 200.0, 100.0\n    return x, y, vx, vy\n`;
