# Hi there :wave:, thanks for visiting my repository for the **Hearing Simulator Web Application** #

## Here is a small **Table of Contents** to guide you through this project ##

1. About
2. Running Project Locally
3. Future Goals for the Project

## About ##
The Hearing Simulator Web Application began with an idea from previous OSU Cascades student Eric Branner; 
to create a series of audio filters to recreate the stages of deafness Beethoven experienced through a
rendition of one of his compositions. 

I took on this project after Eric graduated and pivoted the goals of the project. I set out to implement 
similar audio filters to mimic hard of hearing using the Audiogram template, which is the industry standard
for audiologists determining hearing ability for frequency ranges. 

The main goal of this project is to implement a user friendly web application to interact with the way in which 
sounds are heard depending on how someone scores on an Audiogram reading. This application is not designed for use in 
the health industry, but rather as a tool for education and development of understanding for those who have hearing loss.

## Running the Web Application Locally ##
While this project (in a more complete state) will be accessible on the web in the future, here are steps to run it 
locally if you would like to edit and play around with the code yourself. 

First you need to download the files from this repository locally, either through forking on GitHub or copy and pasting the text.

Once you have the files in a folder, all you need is to run the html file on your local machine. There are many ways to do this, but 
I've found the easiest way is to install python on your machine and in the directory with your files run:

``` python -m http.server ```

which should output a message like such: 

``` Serving HTTP on :: port 8000 (http://[::]:8000/) ... ```

if running after updating files, remember to check and clear cahce if experiencing errors. 

then navigate to the correct local port url (http://localhost:8000/) on your favorite browser and you should see the application up and running!

## Future Goals for the Project ##
I believe that without too much difficulty, this sort of filter could be used as a live web audio filter. This would allow media developers 
to choose levels of hearing ability and in turn design for comfortable accessibility in the auditory aspects of their work.


If you have reached the end of this read me, I am assuming you've scrolled past most of this document. But if that's not the case and you 
were hoping for more information and or questions answered please feel free to shoot me a message on here and I'll try to get back to you!
