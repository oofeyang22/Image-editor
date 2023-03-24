let fileInput= document.querySelector(".file-input");
let chooseImgBtn= document.querySelector(".choose-img");
let placeholderImg= document.querySelector(".placeholder img");

const filterName= document.querySelector(".slider-info .name");
const filterValue= document.querySelector(".slider-info .value");
const filterSlider= document.querySelector("input");
const filterBtns= document.querySelectorAll(".filter button");
const rotateBtns= document.querySelectorAll(".rotate button");
const resetBtn= document.querySelector(".reset-btn");
const saveImgBtn= document.querySelector(".save-img");

let brightness= 100, saturation=100, inversion=0, grayscale=0, contrast=100,
opacity=100, sepia=0;

let rotate= 0, flipHorizontal= 1, flipVertical= 1;

const loadfile= () => {
    let file= fileInput.files[0];

    if(!file) return;

    placeholderImg.src= URL.createObjectURL(file);

    placeholderImg.addEventListener("load", () => {
        document.querySelector(".wrapper").classList.remove("disable");
        resetBtn.click();
    })
}

const addFilter= () => {
    placeholderImg.style.filter= `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%)
    grayscale(${grayscale}%) contrast(${contrast}%) opacity(${opacity}%) sepia(${sepia}%)`;

    placeholderImg.style.transform= `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
}

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".filter .active").classList.remove("active");
        btn.classList.add("active");
        filterName.innerText= btn.innerText;

        if(btn.id==="brightness"){
            filterSlider.max= "200";
            filterSlider.value= brightness;
            filterValue.innerText= `${brightness}%`;
        }else if(btn.id==="saturation"){
            filterSlider.max= "200";
            filterSlider.value= saturation;
            filterValue.innerText= `${saturation}%`;
        }else if(btn.id==="inversion"){
            filterSlider.max= "100";
            filterSlider.value= inversion;
            filterValue.innerText= `${inversion}%`;
        }else if(btn.id==="grayscale"){
            filterSlider.max= "100";
            filterSlider.value= grayscale;
            filterValue.innerText= `${grayscale}%`;
        }else if(btn.id==="contrast"){
            filterSlider.max= "200";
            filterSlider.value= contrast;
            filterValue.innerText= `${contrast}%`;
        }else if(btn.id==="opacity"){
            filterSlider.max="100";
            filterSlider.value= opacity;
            filterValue.innerText= `${opacity}%`;
        }else{
            filterSlider.max="100";
            filterSlider.value= sepia;
            filterValue.innerText= `${sepia}%`;
        }
        addFilter();
    })
})

const createFilter= () => {
    filterValue.innerText = `${filterSlider.value}%`;

    const selectedFilter= document.querySelector(".filter .active");

    if(selectedFilter.id="brightness"){
        brightness= filterSlider.value;
    }else if(selectedFilter.id="saturation"){
        saturation= filterSlider.value;
    }else if(selectedFilter.id="inversion"){
        inversion= filterSlider.value;
    }else if(selectedFilter.id="greyscale"){
        grayscale= filterSlider.value;
    }else if(selectedFilter.id="contrast"){
        contrast= filterSlider.value;
    }else if(selectedFilter.id="opacity"){
        opacity= filterSlider.value;
    }else{
        sepia= filterSlider.value;
    }

}

rotateBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if(btn.id="left"){
            rotate-= 90;
        }else if(btn.id="right"){
            rotate+= 90;
        }else if(btn.id="horizontal"){
            flipHorizontal= flipHorizontal===1 ? -1 : 1;
        }else{
            flipVertical= flipVertical===1 ? -1 : 1;
        }
        addFilter();
    })
})

const removeFilter= () => {
    brightness= 100, saturation=100, inversion=0, grayscale=0, contrast=100,
opacity=100, sepia=0;

    rotate= 0, flipHorizontal= 1, flipVertical= 1;
  
    filterBtns[0].click();
    addFilter();
}

const saveImage= () => {
    let canvas= document.createElement("canvas");
    let ctx= canvas.getContext("2d");
    canvas.width= placeholderImg.naturalWidth; //setting canvas width to actual image width
    canvas.height= placeholderImg.naturalHeight; //setting canvas height to actual image height
    ctx.translate(canvas.width / 2, canvas.height / 2); //translating canvas from center
    if(rotate!==0){
        ctx.rotate(rotate * Math.PI/180);
    }
    ctx.scale(flipHorizontal, flipVertical); // flip canvas horziontally or vertically
    ctx.drawImage(placeholderImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
  
    const ahref= document.createElement("a");
    ahref.download= "image.jpeg"; //passing <a> tag download to "image.jpeg"
    ahref.href= canvas.toDataURl();
    ahref.click(); //clicking <a> tag so it can download
}

fileInput.addEventListener("change", loadfile);

chooseImgBtn.addEventListener("click", () => {
    fileInput.click();
});

filterSlider.addEventListener("input", createFilter);
resetBtn.addEventListener("click", removeFilter);
saveImgBtn.addEventListener("click", saveImage)


