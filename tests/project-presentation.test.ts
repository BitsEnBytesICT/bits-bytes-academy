import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { ProjectPane } from "../frontend/src/components/ProjectPane.tsx";
import type { Course, Project } from "../shared/types";

test("Both project briefs render their sample, manual tests and optional extension in both languages", () => {
  const course: Course = JSON.parse(
    fs.readFileSync("content/course.json", "utf8"),
  );
  const projects = course.activities.filter(
    (a): a is Project => a.kind === "project",
  );
  assert.equal(projects.length, 2);
  assert((projects.find((project) => project.chapter === 10)?.manualTests?.length || 0) >= 10);
  for (const activity of projects)
    for (const language of ["en", "nl"] as const) {
      const html = renderToStaticMarkup(
        React.createElement(
          MemoryRouter,
          null,
          React.createElement(ProjectPane, {
            activity,
            course,
            language,
            milestones: [],
            complete: false,
            onMilestones: () => {},
            onComplete: async () => {},
            onActivity: () => {},
          }),
        ),
      );
      for (const section of activity.sections || [])
        assert(html.includes(section.heading[language]));
      if (activity.manualTests) {
        assert.equal(
          (html.match(/<tr>/g) || []).length,
          activity.manualTests.length + 1,
        );
        assert(html.includes("5 / 0"));
      }
      assert(!html.includes("Copy an earlier project"));
      assert(!html.includes("Both visits"));
    }
});
