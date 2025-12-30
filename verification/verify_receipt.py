from playwright.sync_api import sync_playwright, expect
import time

def verify_receipt_download():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(accept_downloads=True)
        page = context.new_page()

        # Capture console logs
        page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))
        page.on("pageerror", lambda exc: print(f"PAGE ERROR: {exc}"))

        page.goto("http://localhost:5173/success?payment_intent=pi_123&payment_intent_client_secret=secret_123&redirect_status=succeeded")

        js_inject = """
            const orderData = {
                items: [
                    { title: "Test Item 1", quantity: 2, price: 10.00 },
                    { title: "Test Item 2", quantity: 1, price: 50.00 }
                ],
                total: 70.00,
                shippingProtection: true,
                timestamp: new Date().toISOString()
            };
            sessionStorage.setItem('lastOrder', JSON.stringify(orderData));
            sessionStorage.setItem('lastOrderNumber', 'REV-TEST-123');
        """
        page.evaluate(js_inject)

        page.reload()
        page.wait_for_selector("text=Order Confirmed!")

        # Click Download Receipt without waiting for download event first, to see if errors pop up
        # But to capture download we need expect_download

        try:
            with page.expect_download(timeout=5000) as download_info:
                page.get_by_text("Receipt").click()

            download = download_info.value
            path = download.path()
            download.save_as("verification/receipt.pdf")
            print(f"Receipt downloaded to verification/receipt.pdf")
        except Exception as e:
            print(f"Download failed: {e}")

        # Take another screenshot to see if any alert popped up or something
        page.screenshot(path="verification/after_click.png")

        browser.close()

if __name__ == "__main__":
    verify_receipt_download()
