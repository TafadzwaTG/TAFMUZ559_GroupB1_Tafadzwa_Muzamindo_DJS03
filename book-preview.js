class BookPreview extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'open'});

        //Create elements
        const wrapper = document.createElement('div');
        wrapper.classList.add('preview');

        const image = document.createElement('img');
        image.classList.add('preview__image');
        wrapper.append(image);

        const info = document.createElement('div');
        image.classList.add('preview__info');
        wrapper.append(info);

        const title = document.createElement('h3');
        image.classList.add('preview__title');
        wrapper.append(title);

        const author = document.createElement('div');
        image.classList.add('preview__author');
        wrapper.append(author);

         //Add styles
        const style = document.createElement('style');
        style.textContent = `
        .preview{
        display: flex;
        align-items: center;
        cursor: pointer;

    }
        .preview__image{
        width: 50px;
        height: 75px;
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
        coolr: #555;
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