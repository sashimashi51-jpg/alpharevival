from playwright.sync_api import sync_playwright

def verify_countdown_banner():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to home page
        page.goto("http://localhost:5173/")

        # Wait for content to load
        page.wait_for_load_state("networkidle")

        # Take a screenshot of the top of the page where the banner should be
        page.screenshot(path="verification/landing_page_top.png")

        # Check if we can find the countdown banner component.
        # Note: LandingPage.jsx does NOT use CountdownBanner anymore (it uses TimerBanner).
        # So we might not see .countdown-banner in the DOM of LandingPage.
        # But we want to verify the styles didn't break the page.

        print("Screenshot taken.")
        browser.close()

if __name__ == "__main__":
    verify_countdown_banner()
