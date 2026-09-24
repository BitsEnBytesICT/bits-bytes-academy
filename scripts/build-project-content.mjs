import fs from 'node:fs';
import path from 'node:path';
import { course, estimatedHours } from '../content-src/project-course/index.mjs';

const ids = new Set(course.activities.map(a=>a.id));
if (ids.size !== course.activities.length) throw new Error('Duplicate activity IDs');
for (const activity of course.activities) {
  for (const id of [...(activity.references || []), ...(activity.continueFrom ? [activity.continueFrom] : [])]) {
    if (!ids.has(id)) throw new Error(`Missing reference ${id}`);
  }
}
fs.mkdirSync('content', {recursive:true});
for (const chapter of course.chapters) {
  const directory = path.resolve('content/project-course', String(chapter.number).padStart(2,'0')+'-'+chapter.slug);
  fs.mkdirSync(directory,{recursive:true});
  fs.writeFileSync(path.join(directory,'chapter.json'),JSON.stringify(chapter,null,2));
  for (const id of chapter.activityIds) fs.writeFileSync(path.join(directory,id+'.json'),JSON.stringify(course.activities.find(a=>a.id===id),null,2));
}
fs.writeFileSync('content/course.json',JSON.stringify(course,null,2));
console.log(`${course.activities.length} activities in two paths / ten modules; approximately ${estimatedHours} required hours. Legacy content preserved.`);
