import P5 from "p5";
import Remote from "../remote";


export class Image {
    public static imageCount = 0;

    private image: P5.Image;
    private id: string = '';

    constructor(private pixels: Array<number>, private width: number, private height: number) {
        new P5(this.init.bind(this));
    }

    public static convertPixelsToRemote(pixels: Array<number>, engine: P5, width: number, height: number) {
        let rawImage = [];
        for (let i = 0; i < pixels.length; i += 4){
            if (engine.color('black').toString() === engine.color(pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]).toString())
                rawImage.push(0)
            else rawImage.push(255);
        }
        return rawImage;
    }

    public init(engine: P5): void {

        engine.setup = () => {
            this.id = `image-${Image.imageCount}`
            let container = document.createElement('div');
            container.id = this.id;
            container.className = 'image';
            document.getElementById('images').appendChild(container);
            const canvas = engine.createCanvas(this.width, this.height);
            canvas.parent(`#${this.id}`);
            engine.background('black');
            this.image = engine.createImage(this.width, this.height);
            this.image.loadPixels();
            const { pixels } = this;
            pixels.forEach((e, i) => this.image.pixels[i] = e);
            this.image.updatePixels();
            let ans = document.createElement('div')
            ans.id = `${this.id}-answer`
            ans.innerText = 'Число: ...';
            container.appendChild(ans);
            Remote.sendPicture({data: Image.convertPixelsToRemote(this.pixels, engine, this.width, this.height)}, (res) =>
                document.getElementById(`${this.id}-answer`).innerText = `Число: ${res.result}`
            );
        }

        engine.draw = () => {
            engine.image(this.image, 0, 0);
            console.log(this.image);
            engine.noLoop();
        }
    }

    public static create(pixels: Array<number>, w: number, h: number): Image {
        Image.imageCount += 1;
        return new Image(pixels, w, h);
    }
}