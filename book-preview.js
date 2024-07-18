class BookPreview extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'open'});

        //Create elements
        const wrapper = document.createElement('div');
        wrapper.classList.add('preview');

        const image = document.createElement('img');
        image.classList.add('preview__image');
        
        const info = document.createElement('div');
        info.classList.add('preview__info');
        
        const title = document.createElement('h3');
        title.classList.add('preview__title');
      
        const author = document.createElement('div');
        author.classList.add('preview__author');
        

        info.appendChild(title);
        info.appendChild(author);
        wrapper.appendChild(image);
        wrapper.appendChild(info);

         //Add styles
        const style = document.createElement('style');
        style.textContent = `
        .preview{
        display: flex;
        align-items: center;
        cursor: pointer;

    }
        .preview__image{
        width: 100px;
        height: 150px;
        object-fit: cover;
        margin-right: 10px;
        }
        
        .preview__info{
        display: flex;
        flex-direction: column;
        }
        .preview__title{
        font-size: 1em;
        margin: 0;
        }
        
        .preview__author{
        font-size: 0.874em;
        color: #555;
        }
        `;
        shadow.appendChild(style);
        shadow.appendChild(wrapper);

    }

    connectedCallback(){
        this.shadowRoot.querySelector('.preview__image').src = this.getAttribute('image');
        this.shadowRoot.querySelector('.preview__title').innerText = this.getAttribute('title');
        this.shadowRoot.querySelector('.preview__author').innerText = this.getAttribute('author');
    }

}
customElements.define('book-preview', BookPreview);