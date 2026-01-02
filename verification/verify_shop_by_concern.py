from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to homepage
        # Assuming port 5173 based on standard Vite config, but I'll check server.log if it fails
        try:
            page.goto("http://localhost:5173")
        except:
             # Try 3000 if 5173 fails
            page.goto("http://localhost:3000")

        # Wait for the new section to be visible
        # Header: "Reactivate Your Growth"
        heading = page.get_by_text("Reactivate Your Growth")
        expect(heading).to_be_visible(timeout=10000)

        # Check for one of the concerns
        concern = page.get_by_text("Receding hairline and temple regrowth")
        expect(concern).to_be_visible()

        # Scroll to the section to ensure it's in view for screenshot
        heading.scroll_into_view_if_needed()

        # Take screenshot of the whole section
        # We can try to locate the section wrapper if possible, or just take a page screenshot
        # The section has 'Reactivate Your Growth' inside it.
        # Let's take a screenshot of the viewport after scrolling
        page.screenshot(path="verification/shop_by_concern.png")

        browser.close()

if __name__ == "__main__":
    run()
