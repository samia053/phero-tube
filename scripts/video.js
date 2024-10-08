//console.log("hiiii")

const  removeActiveClass =() =>{
    const buttons =document.getElementsByClassName("btn-class") 
    console.log(buttons)
    for(let btn of buttons){
        btn.classList.remove("active")
    }

}
 
const loadCategoryVideos = (id) => {
   // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then( res => res.json())
    
    .then(data => {

        // remove activeClass
        removeActiveClass();
        const activeBtn =document.getElementById(`btn-${id}`)
        console.log(activeBtn)
        activeBtn.classList.add("active");
        displayVideos(data.category)
    })
    .catch((error) => console.log(error))

}

// 1. fetch,  load and show categories on html


//create loadCategories

const loadCategories = () => {
    //console.log("load category");
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then( res => res.json())
    .then(data => DisplayCategories(data.categories))
    .catch((error) => console.log(error))


        };  




        // load display video details

        const loadDetails = async(videoId) =>{
            console.log(videoId);
         const uri =`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
         const res = await fetch(uri);
         const data = await res.json();
         DisplayDetails(data.video)

         


        }
// display details

        const DisplayDetails = (video) => {
            console.log(video);

            const DetailsContainer = document.getElementById("modal-content");

            DetailsContainer.innerHTML =`
                <img src = ${video.thumbnail} />
                <p>${video.description} </p>
            
            `;
            document.getElementById("showModal").click();

        }

// create display

const DisplayCategories = (categories) => {

    const categoryContainer = document.getElementById("category")
    //console.log(categories);
    categories.forEach(item => {
        console.log(item)

        // create button
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
            <button class="btn-class" id='btn-${item.category_id}' 
            onclick="loadCategoryVideos(${item.category_id})" class = "btn">
            ${item.category}
            </button>
        `;

        
       
        //add button to the container

        categoryContainer.appendChild(buttonContainer);
    });

   //create button // 
    // const button = document.createElement("button");
    // button.classList ="btn";
    // button.innerText = element.category;
    // //add button to the container

    // categoryContainer.appendChild(button)

};




// load videos

const loadVideos = (searchText =  "") => {
    //console.log("load category");
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${
        searchText}`)
    .then( res => res.json())
    
    .then(data => displayVideos(data.videos))
    .catch((error) => console.log(error))


        }; 




        // display videos

        const displayVideos = (videos) => {

            const videoContainer =document.getElementById("videos")
            videoContainer.innerHTML= "";

            if(videos.length == 0){
                videoContainer.classList.remove("grid")
                videoContainer.innerHTML =`
                    <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center"  >
                    <img src ="assests/Icon.png" />
                    <h2 class="font-bold">No content here in this category </h2>
                `;
                return;
            }
            else{
                videoContainer.classList.add("grid")
            }
            //console.log(videos)
            videos.forEach(video => {
                console.log(video)

                const card = document.createElement("div")
                card.classList ='card card-compact '
                card.innerHTML =`
                <figure class = "relative h-[200px] ">
                    <img 

                    src=${video.thumbnail}
                    class ='h-full w-full object-cover'
                    alt="Shoes" />             
                </figure>
                <div class="px-0 py-2 flex gap-2">
                <div>
                     <img class ="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}
                     />
                     
                     <p> <button onclick= "loadDetails('${video.video_id}')" class="btn btn-error btn-sm">Details </button> </p>
                </div>
                
                <div>
                <h3 class ="font-bold">${video.title} </h3>
                <div class ="flex items-center gap-2">
                <p class ="text-gray-400">${video.authors[0].profile_name} </p>
                ${video.authors[0].verified == true ?  `<img class ='w-5 h-5 rounded-full object-cover' src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"
                    />` :"" }
                 
                </div>
                </div>

                    
                </div>
                `
                videoContainer.appendChild(card)

                
            });

        }

       

        
                    

        document.getElementById("search-input").addEventListener("keyup",(e)=>{
                loadVideos(e.target.value)
                console.log()
        })
       
        document.getElementById("sort-btn").addEventListener("onclick",(e)=>{
                    loadVideos()

        })
        loadCategories();
        loadVideos();


      //
    //   ${
    //     video.others.posted_date?.length == 0
    //     ? ""
    //     : `<span class = " absolute right-2 bottom-2 bg-black p-1> ${video.others.posted_date}</span>`
    //  }

        //loadVideos();