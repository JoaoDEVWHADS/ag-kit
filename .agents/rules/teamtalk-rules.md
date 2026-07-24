---
name: teamtalk-rules
version: 1.0.0
priority: P0
trigger: keywords: ["TeamTalk", "TeamTalk5", "TeamTalkPy", "TT5", "TeamTalk SDK", "TeamTalkJNI", "TeamTalkDotNet"]
---

# TeamTalk SDK Routing & Rules

> Mandatory routing rule for TeamTalk 5 SDK development and queries.

---

## 🎯 TeamTalk Request Routing

When the user's request contains keywords related to TeamTalk:

1. **Auto-Route Agent:** Automatically select `teamtalk-developer`.
2. **Auto-Load Skill:** Automatically load `teamtalk-sdk`.
3. **Announce Knowledge:**
   ```markdown
   🤖 **Applying knowledge of `@[teamtalk-developer]`...**
   📚 **Using skills: `@[teamtalk-sdk]`...**
   ```

4. **Multi-Language Awareness:**
   - Default to the user's specified language (Python, C++, C#, Java/Android).
   - Ensure backwards compatibility with TeamTalk 5.8.1 API while utilizing features up to the current 5.x releases.
