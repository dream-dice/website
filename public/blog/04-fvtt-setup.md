# My Foundry Virtual Tabletop (FVTT) Setup

This is my current Virtual Tabletop of choice. VTTs, in general, are a hotly debated topic. Many people have favorites, and many people get passionate about them. This is for anyone who uses FVTT and wants a really nice set up. I think some of these things are transferable, and perhaps read the next section before you decide this blog is not for you today.

## VTT agnostic

I am VTT agnostic. This means I have tried to set up my sessions in a way that does not require any specific solution. So when a new technology comes along that I am happy with, I will swap in a heartbeat.

How do you become VTT agnostic? It's actually very simple. It means you put all your assets, and notes in a tool like Google and have it set up in a way that you can swap to somewhere else and not worry about it. Huzzargh!

This doesn't work for everything and I am still looking into trying to make FVTT more agnostic for my purposes.

The rest of this article is how I setup FVTT, whilst trying to make sure that I can quickly move to another tool.

## Assets

All of my assets are in 2 places.

1. Figma, where I create content such as tokens, tiles and sometimes art (I love Figma, but don't reccomend it unless you happen to have worked with it in the past).

2. Google Drive. You can get a lot in the default storage and you can create as many accounts as you need. Perhaps make a D&D account just for your assets. Obviously replace Google with your favourite cloud provider.

Now, I host my own FVTT instance following the free Oracle hosting solution. It isn't so difficult, but the tutorial doesn't include things like setting up your own secure hostname, how to maintain a server like this and various other little things.

If you host your own server `alias gdrive='rclone sync assets:'\''dnd-assets'\'' /home/ubuntu/assets'` is my friendly little alias for `rclone`, which is a terminal tool for cloning from the cloud and means I can clone from Google to my Ubuntu instance. You will need to follow instructions for this. The nice thing is, it is really quick as it doesn't rely on my internet to copy things across.

Even if you aren't using FVTT, or hosting your own tool I would still reccomend you use a cloud solution for hosting your files. This way you can combat against limits that free soltions, such as Let's Role or Roll20. You can delete what you don't need but know that it is all safely backed up in the cloud. This is pretty good practice anyway, especially if you look after a lot of your own content.

## Alternate Asset Management

Git and GitHub. You can actually host your assets using GHPages and in FVTT you can reference external links. You could also use `git clone` and `git pull` instead of `rclone` which might be quicker and comes with versioning and won't blat your files if you are messing around in there (unless there is a merge conflict).

I used to do this, but then stopped after a while and TBH I am not sure why I stopped. The other nice thing you could do with git, for FVTT, is back up your game once a day. For me, I could back it up every night at 3am or something and I would know that GH is up to date without me having to keep it so. Some people said there was issues with files for this. For me I hit a limit on file size. Which I think I have actually solved. The other issue is, I wanted to share my assets with people and GH was confusing for them since they had 0 knowledge of the developing world. Where as they understood GDrive, plus I was already paying for GDrive to get extra storage for my family.

Eh, the choice is yours. I think a fast way would be to use GH and GHPages to host small images and videos.

## Notes

I haven't looked but I am suddenly interested. I wonder if there is a way for me to use Google Docs or GitHub to populate my notes, hot damn GH would work for this as well.

If I was to somehow write my notes using Markdown then copy them across to Foundry that would mean I don't need to open FVTT in order to do this.

Right I have made up my mind I will.

The only thing I would reccomend against this, is making it public. If you decide to put all your notes in FVTT and make it public then you run the risk of 2 things. Someone saying "Take that down, you are distributing it for free!", or worse, your players finding the notes.

You need pins for FVTT. This is one thing which makes FVTT so good and all VTT need to do this. FVTT should be doing more on this. It is so important to the way I work. I so rarely scroll around my notes, with that annoying "ah, give me one second, and, it is... here! No wait..." moment. I just double click my notes on the page and put them next to the thing I want to talk about.

Another thing you should do, scrap the sodding module notes. They are so dumb and often don't help in VTTs. Everyone can see the content, or you need to describe more than the content has available. I get why they are there, and you should probably be doing this anyway and not reading it verbaitum. However, you normally back yourself in a corner when you do.

If I could 