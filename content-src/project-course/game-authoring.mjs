import { L, section, task } from "./authoring.mjs";

export const previewSection = section(
  L("Run, observe, then finish", "Voer uit, bekijk en rond af"),
  L(
    "Run starts main.py and opens the game preview. Click the preview to use the keyboard. Clicking elsewhere pauses the game. Finish & check sends the normal close event and checks your helper functions after the loop exits; Stop interrupts without grading. The supplied async loop gives the browser time to draw and receive input. Keep await asyncio.sleep(1 / 60) inside that loop. You do not need to learn asynchronous programming in depth yet.",
    "Run start main.py en opent het spelvoorbeeld. Klik op het voorbeeld om het toetsenbord te gebruiken. Elders klikken pauzeert het spel. Afronden en controleren stuurt de normale sluitgebeurtenis en controleert je hulpfuncties nadat de lus eindigt; Stop onderbreekt zonder beoordeling. De meegeleverde async-lus geeft de browser tijd om te tekenen en invoer te ontvangen. Houd await asyncio.sleep(1 / 60) binnen die lus. Je hoeft asynchroon programmeren nog niet uitgebreid te leren.",
  ),
);

export function sceneMain(
  expression = "scene.make_scene(640, 400)",
  setup = "",
  frame = "",
) {
  return `import asyncio
import pygame
import scene

async def main():
    pygame.init()
    screen = pygame.display.set_mode((640, 400))
    running = True
${setup}    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE:
                running = False
${frame}        screen.blit(${expression}, (0, 0))
        pygame.display.flip()
        await asyncio.sleep(1 / 60)
    pygame.quit()

asyncio.run(main())
`;
}

export function gameTask(description, hints, feedback, probes) {
  return task("", description, "_rendered_frames > 0", hints, feedback, probes);
}
export function sceneProbe(name, args, check, options = {}) {
  return {
    moduleOnly: true,
    call: { module: "scene", name, args },
    check: "_error is None and (" + check + ")",
    ...options,
  };
}
