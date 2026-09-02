# Test devices

Custom devices for Chrome DevTools device mode (Settings > Devices > Add custom device).
Six viewports, in width order. Together they put a device on each side of every media
query in `src/**/*.css` (560, 640, 720, 920, 1024 and 1200 px).

| Name | Width | Height | DPR | Type | User agent string |
|---|---|---|---|---|---|
| Small Android | 360 | 800 | 3 | Mobile | `Mozilla/5.0 (Linux; Android 14; SM-A546B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36` |
| iPhone 14 | 390 | 844 | 3 | Mobile | `Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1` |
| iPad portrait | 768 | 1024 | 2 | Mobile | `Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1` |
| Z Fold 7 open | 984 | 1092 | 2 | Mobile | `Mozilla/5.0 (Linux; Android 16; SM-F966B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36` |
| Laptop 1280 | 1280 | 720 | 1 | Desktop | `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36` |
| Desktop 1920 | 1920 | 1080 | 1 | Desktop | `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36` |

## Why these six

- **Small Android, 360 wide.** Below the 560 and 640 rules. The narrowest common phone
  and the second most common mobile resolution worldwide.
- **iPhone 14, 390 wide.** The mainstream phone. Third most common mobile resolution.
- **iPad portrait, 768 wide.** Above 720, below 920 and 1024. The most common tablet
  resolution.
- **Z Fold 7 open, 984 wide.** The only device in the 920 to 1024 band, and the only
  near-square viewport. Its cover screen is 360 wide, which the Small Android row covers.
- **Laptop 1280.** Above 1024, below 1200.
- **Desktop 1920.** Above 1200. The most common desktop resolution by a wide margin.

Shares are from StatCounter, August 2026.

## Notes

- The two desktop rows share one user agent string. Nothing in the string encodes
  screen size.
- Real iPadOS Safari sends a Mac user agent by default. The iPad string above is the
  "Request Mobile Website" form. To test what most iPad users actually send, paste the
  desktop string into the iPad row and keep the Type dropdown on Mobile.
- Leave the user agent client hints section collapsed. Chrome derives them from the
  string.
- Layout is driven by viewport width, not the user agent. The string only matters for
  code or third-party scripts that sniff it.
