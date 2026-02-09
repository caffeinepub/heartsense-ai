# Specification

## Summary
**Goal:** Correct the Project Owner LinkedIn link in the footer by removing the incorrect URL and only showing a LinkedIn link when a valid profile URL is configured.

**Planned changes:**
- Remove any footer link pointing to `https://www.linkedin.com/in/sunil-biradar`.
- Add support for configuring the correct LinkedIn profile URL; if it is not configured/available, hide the LinkedIn icon/link in the footer (keep the email link visible).
- When a valid LinkedIn URL is configured, ensure the footer link opens in a new tab with `target="_blank"` and `rel="noopener noreferrer"`.

**User-visible outcome:** The footer no longer shows the wrong LinkedIn account; it either links to the correct LinkedIn profile (opening in a new tab) or hides the LinkedIn link entirely until a valid URL is provided.
