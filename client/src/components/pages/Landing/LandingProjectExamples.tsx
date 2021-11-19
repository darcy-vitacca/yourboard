import { Markdown } from "../../../shared/markdown";
import { ExampleImages, ImageSectionContainer } from "./LandingPage";

export const LandingProjectExamples = () => {
  return (
    <>
      <ImageSectionContainer>
        <ExampleImages src="https://ik.imagekit.io/ticnymjalpq/tr:w-500,h-416/recipeProject_2HQSnlY2H9D.png?updatedAt=1635751114271" />
        <div>
          <Markdown children="### Project Dashboard " />
          <Markdown children="The project dashboard is **where your links are**, simply click on any of these to **navigate to something**. In this example we at urboard use this project to store all of our recipes. " />
          <Markdown children="Anytime you see a recipe you like, add it here. **No more trying to find links** for recipes you have in  a lot of different places. The best part is when it's time to cook you wont have to bring your laptop as you can access this on your phone!" />
          <Markdown children="You **can invite friends** to this project too! So now we have a community where we can all post great recipes. Awesome! 🍔🍸🍔🍸 " />
        </div>
      </ImageSectionContainer>
      <ImageSectionContainer>
        <ExampleImages src="https://ik.imagekit.io/ticnymjalpq/tr:w-500,h-416/projects_aBmC5EMbSipD.png?updatedAt=1635751067952" />
        <div>
          <Markdown children="### urboard dashboard" />
          <Markdown children=" Navigate through all created projects here, this is **your** mission control" />
        </div>
      </ImageSectionContainer>
      <ImageSectionContainer>
        <ExampleImages src="https://ik.imagekit.io/ticnymjalpq/tr:w-500,h-416/addLinks_DuhczUdma2T.png?updatedAt=1635751023331" />
        <div>
          <Markdown children="### Add Links" />
          <Markdown children="**Add links** into a project, get rid of that pesky notepad of links on your computer. Simply drag and drop a link from another browser window or copy paste them all in here 😮 and see what happens!" />
        </div>
      </ImageSectionContainer>
      <ImageSectionContainer>
        <ExampleImages src="https://ik.imagekit.io/ticnymjalpq/tr:w-500,h-416/addProjects_wkWU725Lkuj.png?updatedAt=1635751063826" />
        <div>
          <Markdown children="### Add Folder" />
          <Markdown children="**Add Folders** of where you want your links to live, think of it like a subfolder." />
        </div>
      </ImageSectionContainer>
    </>
  );
};
