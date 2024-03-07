# Using JSInterop with Blazor (.NET8)

In order to properly grok the whole JSInterop thing with Blazor, I've created a minimal proof-of-concept project based on the empty Blazor template (`dotnet new blazor -e`). Here's what I've learned...

## Loading Your Scripts

First of all, my research so far has implied that I should be loading up my JavaScript files from the "root" of my app, meaning the `Components/App.razor` file, rather than trying to load them ad-hoc in individual components. So far, success!👍

My next experiment was to see if I could inject an ad-hoc JavaScript file through the `<HeadContent>` component on any given page. It worked in the `Home.razor`. To flesh out the idea a bit more, I created a couple of little page components, one with the ad-hoc JS and the other without (just to prove that there wasn't anything special to having tried that in the `Home.razor` page). This produced some interesting findings.

- Because Blazor is dynamically loading the page content via AJAX/SignalR (it's current left to its default rendering mode), the ad-hoc JavaScript file was present in all the pages because any `<HeadContent>` was *not* cleared out by the mere absense of that element from my `One.razor` page. I did not expect that. Of course, a full page refresh (<kbd>ctrl</kbd> + <kbd>F5</kbd>) from the `One.razor` page would eliminate the ad-hoc JavaScript file, but it did so for ***all*** the other pages!
  - On a bit of reflection, it kinda makes sense. After all, with the `<HeadOutlet>` being a natural place to see JavaScript injected, and with the page rendering happening via Ajax, it would be undesireable to have scripts re-loaded inadvertantly. Still, it seems to imply that a `<HeadContent>` isn't something that simply gets "cleaned", and I don't know if that's because Blazor has to concede to something about what browsers expect/allow in terms of Ajax mucking with the `<head>` or what. It probably needs some more poking around....


----

## Appendix

### Reflections

One of the potential downsides of using Blazor as a quick go-to is the potential *unfettered complexity* that can come if you are needing to fold in more technologies. Notice in this proof-of-concept, all I'm trying to get into play is some basic JavaScript, and that's without trying to blend in rendering modes. The unexpected behaviours such as how `<HeadContent>` behaves when [loading scripts](#loading-your-scripts) sparked a lot of caution in me. What would happen if I start mucking about with render modes? Would I get spooky side effects?

Granted, the folks at Microsoft are looking at all the possible combinations and functionality, but without it being clearly documents (and by clear, I mean *easy to read* and *easy to find*), the newbie developer (or even a seasoned one) might experience all of it as "spooky".
