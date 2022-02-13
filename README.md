# EncuentraMe <p> 

## Team

[Andres Ortiz](mailto:3283@holbertonschool.com)  [Ayrton Coelho](mailto:3282@holbertonschool.com)  [Ronald Alexander Rivero](mailto:3284@holbertonschool.com)

## Technologies

-   Python - Backend
-   HTML - Frontend
-   CSS - Frontend
-   Javascript - Frontend
-   Facebook API
-   Google maps API

## Challenge

This project was born after detecting the large number of lost dogs and cats that are published daily on social networks, dozens of posts are shared arbitrarily, many times not knowing when it was created, or if the pet has already been found. To solve this problem, EncuentraMe is created, being a centralized platform where the information of each lost pet can be registered, updated and posted on Facebook, Instagram and Twitter and also, generates value by registering this data on a map that can be easily accessed by anyone, anywhere in the world, facilitating the search and identification of lost pets by location.

This project will not solve transportation for pets, veterinary help nor give an entire solution for every missing pet, it will only provide extra help by using a known technology as a tool to help lost paws to find a home.

This project will help families looking for their pets and their pets itself. There will be two kinds of users:

-   The Pet Owner (PO): This is intended for users that have lost their pet and would like to find it through our platform. They must post pictures of the Missed Pet (MP) , a description and the last time they’ve seen their pet. A contact info is required such as email address, social media account and/or phone number that will be publicly shared to other users so the PO can be quickly contacted in case their pet has been found. The PO post will be shared on our social media account and on our custom map. They will be able to update information about their pets once it is found and also will be able to access the main map as a Regular User.
-   The Regular User (RU), is a non-registered user that will be able to access the main map, see and comment on every MP post in case of finding their pets.

## Risks

Core tasks: Implement the facebook APIs for User Login, Share button, Show comments and Direct Messages. Without these implementations our Application will not work. The way to prevent this is allowing all our time and resources to make it work, and only afterwards move to the next tasks.

Another risk to take into consideration is that this will be our first fully deployed application built from scratch, the lack of experience will consume a lot of thinking and planning giving less space for developing time.

## Infrastructure

Tasks will be separated by API implementation, Front and Back end. Branches will be assigned for each task and merged to main only when tested and passed without any errors.

Data will be populated in modules, each module will contain one article for a lost/found animal. A landing page will show every article and a map.

## Existing Solutions

Uruguay:

Social Media posts.

-   Similarities:

-   Posts with pictures of the MP and contact information of the owner.

-   Differences:

-   Individual posts, shared arbitrarily by everyone.
-   No way of tracking pets of the same area.

Latin America:

[Huellitas Perdidas](https://www.google.com/url?q=https://huellitasperdidas.org/&sa=D&source=editors&ust=1644421885665304&usg=AOvVaw2Ks4CvXUP9BCq_Od4XTXSj)  (MX)

-   Similarities:

-   PO must register in the website
-   List of MP

-   Differences:

-   RU cannot post if they find a pet.
-   No map to search for every MP by location
-   Section for MP already founds
-   Section for PO users comments after the MP is found.

Worldwide:

[Animal Search](https://www.google.com/url?q=https://www.animalsearchuk.co.uk/&sa=D&source=editors&ust=1644421885666775&usg=AOvVaw1BZJIKu2SHoiWNIV7b7iJT) (UK)

-   Similarities:

-   Option for registering “Lost a Pet” and a “Found a Pet”.
-   List sections with all MP.
-   Map section with the location of every MP.

-   Differences:

-   Users have to register themselves.
-   Users have their own profile and can register their pets and indicate if the pet is at home or missing. (==>> Own database)
-   Registered Users can set up alerts for new missed pets registered in their area
-   There is no clean up of previous posts. Pets that are missed from past years are still on the map.
