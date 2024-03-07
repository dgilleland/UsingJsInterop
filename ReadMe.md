# Using JSInterop with Blazor (.NET8)

In order to properly grok the whole JSInterop thing with Blazor, I've created a minimal proof-of-concept project based on the empty Blazor template (`dotnet new blazor -e`). Here's what I've learned...

## Loading Your Scripts

First of all, my research so far has implied that I should be loading up my JavaScript files from the "root" of my app, meaning the `Components/App.razor` file, rather than trying to load them ad-hoc in individual components. So far, success!👍

My next experiment was to see if I could inject an ad-hoc JavaScript file through the `<HeadContent>` component on any given page. It worked in the `Home.razor`.
