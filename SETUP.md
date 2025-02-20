Productboard Setup Instructions
===

To install the Productboard app, you must first create an app with a 'Client ID' and 'Client Secret'. Head over to your Productboard account to get started.

Once you've logged in, go to [https://app.productboard.com/oauth2/applications](https://app.productboard.com/oauth2/applications), then click "New OAuth2 Application".

![New OAuth2 Application](/docs/assets/setup/productboard-app-setup-1.png)

Input all the required fields.

For the Redirect URI, copy the Callback URL from the Productboard settings tab in this admin drawer in Deskpro, then paste it in.

For the scopes, check:
- product_hierarchy_data:read

Then click "Create Application".

![Fields](/docs/assets/setup/productboard-app-setup-2.png)
![Scopes](/docs/assets/setup/productboard-app-setup-3.png)

After that, the page will refresh with the Client ID and Client Secret at the top. Copy them and keep them safe, since the Client Secret won't be shown again.

![Newly Created App](/docs/assets/setup/productboard-app-setup-4.png)

Next, head back to Deskpro and enter the Client ID and Client Secret into the app settings form.

To configure who can see and use the Productboard app, head to the "Permissions" tab and select those users and/or groups you'd like to have access.

When you're happy, click "Install".