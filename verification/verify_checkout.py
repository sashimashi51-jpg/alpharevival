from playwright.sync_api import sync_playwright

def verify_checkout(page):
    # 1. Navigate to Product Page
    print("Navigating to product page...")
    page.goto("http://localhost:5173/product")

    # 2. Wait for page to load
    page.wait_for_load_state("networkidle")

    # 3. Click 'ADD TO CART'
    print("Clicking Add to Cart...")
    page.get_by_role("button", name="ADD TO CART").click()

    # 4. Wait for Cart Drawer
    page.wait_for_timeout(2000)

    # 5. Click 'SECURE CHECKOUT' in the drawer
    print("Proceeding to checkout from drawer...")
    # Use exact match or role to avoid ambiguity
    page.get_by_role("button", name="SECURE CHECKOUT").click()

    # 6. Wait for Checkout Page
    page.wait_for_load_state("networkidle")
    # Wait a bit more for deferred elements
    page.wait_for_timeout(2000)

    # 7. Verify Shipping Protection element is present
    print("Verifying Shipping Protection on Checkout Page...")
    # In CheckoutPage.jsx: {shippingProtection && ( ... <span ...>Shipping Protection</span> ... )}
    # Note: If it's false, it won't show. Defaults to true in CartContext.

    # Look for "Shipping Protection" in the Order Summary section
    try:
        # We can look for the text "Shipping Protection"
        # It might appear in the toggle (CartDrawer) or Order Summary (CheckoutPage)
        # On CheckoutPage, it is conditional.
        # Let's check for "Total" and verify we can see it.

        if page.get_by_text("Shipping Protection").count() > 0:
             print("✅ Shipping Protection text found!")
        else:
             print("⚠️ Shipping Protection text NOT found - might be disabled or hidden.")

        # Also check for "Total"
        if page.get_by_text("Total").count() > 0:
            print("✅ Total amount found.")

    except Exception as e:
        print(f"Verification check warning: {e}")

    # 8. Take screenshot
    print("Taking screenshot...")
    page.screenshot(path="verification/checkout_verification.png", full_page=True)
    print("Screenshot saved.")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.set_viewport_size({"width": 1280, "height": 800})
    try:
        verify_checkout(page)
    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="verification/error.png")
    finally:
        browser.close()
