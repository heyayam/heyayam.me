---
title: "A Small PowerShell Automation That Saved Hours"
description: "Hundreds of PDF drawings split and renamed by their drawing numbers — a script that turned an hour of manual work into seconds."
pubDatetime: 2026-09-02T09:00:00+05:30
tags: ["automation", "powershell", "workflow", "ai"]
---

Late one evening in August, our team was preparing for a project submission. One of the final tasks was to split a large PDF drawing package into individual sheets and rename hundreds of files using their drawing numbers.

The obvious option was to start renaming them manually.

But that felt like a terrible way to spend the last hour of the day.

I noticed that the Bluebeam thumbnails panel already contained the information I needed, so I took a screenshot and started working through the problem with AI.

The approach was simple:

**Sheet number → find the corresponding PDF → rename it.**

Once the mapping was figured out, I had a PowerShell script doing the repetitive work.

A few iterations, a quick test, and then:

**Hundreds of files renamed in seconds.**

That was probably my favourite part—not because the script was complicated, but because a fairly annoying manual task had suddenly become a small automation problem.

These are the kinds of things I've been enjoying lately: taking something that looks like "just another repetitive task", finding the pattern, and seeing how far a little AI + PowerShell can take it.

And honestly, watching a folder full of files rename itself correctly is surprisingly satisfying. 😄
