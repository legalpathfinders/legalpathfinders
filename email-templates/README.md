# Email Templates for Supabase

Modern, responsive email templates for Legal Pathfinders authentication flows.

## Templates Included

1. **signup-confirmation.html** - For email verification during signup
2. **password-recovery.html** - For password reset requests

## How to Use in Supabase

### 1. Access Email Templates
- Go to your Supabase Dashboard
- Navigate to **Authentication** → **Email Templates**

### 2. Configure Signup Confirmation
- Select **Confirm signup** template
- Copy the content from `signup-confirmation.html`
- Paste into the template editor
- The `{{ .Token }}` variable will be automatically replaced with the 6-digit OTP

### 3. Configure Password Recovery
- Select **Reset password** template
- Copy the content from `password-recovery.html`
- Paste into the template editor
- The `{{ .Token }}` variable will be automatically replaced with the 6-digit OTP

## Template Features

- **Modern Design**: Clean, professional layout with brand colors
- **Responsive**: Works on all devices and email clients
- **Secure**: Includes security tips and warnings
- **Branded**: Uses Legal Pathfinders branding and colors
- **Clear CTAs**: Large, easy-to-read verification codes
- **Expiration Notice**: Informs users about 10-minute expiration
- **Contact Info**: Includes support email for help

## Supabase Variables

These templates use Supabase's built-in variables:
- `{{ .Token }}` - The 6-digit OTP code
- `{{ .SiteURL }}` - Your site URL (if needed)
- `{{ .Email }}` - User's email address (if needed)

## Customization

You can customize:
- Colors (currently using #2d2d2d, #f5f0e8)
- Logo emoji (⚖️ for signup, 🔒 for password reset)
- Text content
- Contact email
- Footer information

## Testing

After uploading to Supabase:
1. Test signup flow to receive confirmation email
2. Test password reset flow to receive recovery email
3. Verify codes work correctly in your app
4. Check email rendering in different clients (Gmail, Outlook, etc.)
