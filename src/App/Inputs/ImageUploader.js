export default class ImageUploader {
    static UPLOAD_URI = "/upload/image";

    fkey = '';
    imagesArray = [];

    /**
     * Constructor for ImageUploader
     * @param {String} fkey
     * @param {Array} imagesArray
     * @param {Boolean} filterUndefined
     */
    constructor(fkey, imagesArray, filterUndefined = true) {
        this.fkey = fkey;
        this.imagesArray = filterUndefined ? imagesArray.filter(image => typeof image !== 'undefined') : imagesArray;
    }

    /**
     * @param {File|String} imageFile
     */
    createFormData(imageFile) {
        const form = new FormData();
        form.append('fkey', this.fkey);

        if(imageFile[0] instanceof File) {
            form.append('source', 'computer');
            form.append('filename', imageFile[0], 'image.png');
        } else if (imageFile instanceof String) {
            // TODO: implement web image upload
        }

        return form;
    }

    /**
     * @returns {Promise[]}
     */
    startUploading() {
        return this.imagesArray.map(/** @param {File} imageFile */ imageFile => {
            return fetch(ImageUploader.UPLOAD_URI, {
                method: "POST",
                body: this.createFormData(imageFile)
            });
        });
    }
}