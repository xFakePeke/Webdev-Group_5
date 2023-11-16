document.getElementById("get-data").addEventListener("click",function(){

    let offset = document.getElementById("offset").value;
    let limit = document.getElementById("limit").value;
   

    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            const response = JSON.parse(this.responseText);
            let details = document.getElementById('mangalist');
            details.innerHTML = '';
            
            response.data.forEach((info) => {
                
                let container = document.createElement('div');
                container.id = "container";
                details.appendChild(container);

                let imageContainer = document.createElement('div');
                imageContainer.id = "imageContainer";
                container.appendChild(imageContainer);

                let mangaText = document.createElement('div');
                mangaText.id = "mangaText";
                container.appendChild(mangaText);

                let images = document.createElement('img');
                let mId = info.id;
                let fn = info.relationships;
                let fN = fn.filter(f => f.type.includes("cover_art"));
                let fName = fN[0].attributes.fileName;
                images.src = `https://uploads.mangadex.org/covers/${mId}/${fName}`;
                images.textContent = fn;
                imageContainer.appendChild(images);

                let titleElement = document.createElement('h3');
                titleElement.textContent = info.attributes.title.en;
                mangaText.appendChild(titleElement);

                let descript = document.createElement('p');
                descript.textContent = info.attributes.description.en;
                mangaText.appendChild(descript);
            }
    )}
    }
    
    xml.open("GET",`https://api.mangadex.org/manga?limit=${limit}&offset=${offset}&includes%5B%5D=cover_art`);
    xml.send();

})
