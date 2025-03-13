# Terminal Ai Agent

Work with an LLM trough your terminal by writing "ai", 
just like "cd" for navigating & "ls" for listing out files 
on MacOS

Either you need Terminal command-assistance
or 
Wonder how Wood is made from a seed trough water sun on soil



# Setup

After cloning the library, In your terminal, in the root of this directory, 
do first:
  - "npm i"
    
That was to install the dependencies,

follow that up with:
  - "chmod +x index.js"
    
then follow up with the command
  - "npm link"

    
These commands will make the keyword "ai" accessable
Where ever you are inside the Terminal 
Just like how "cd" and "ls" work.


When you First write "ai" in terminal, you will be taken trough a onboarding session
There you will declare your APIKEY, so have it at hand.

The data will ofcourse(!) only be stored on your local machine,
where we have chosen to use the "lowdb"-dependency for Datastorage


# How to use?

When writing "ai" followed up with a question, the terminal ai will act as a terminal assistant, helping you with commands related to work inside the Terminal itself And That Only.


If Writing Only "ai", You will be prompted with a question, that when answered, Will behave as any regular LLM, searching trough the whole web, Able to create analyzes for you, as well as answer every quesiton you need answered From Your Finger Tips
