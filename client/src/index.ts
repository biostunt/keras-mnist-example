import P5 from 'p5';
import './style.scss'
import {Image} from './Image';
import Remote from './remote';

const required_width = 28;
const required_height = 28;

const history: Array<Image> = [];

const init = (engine: P5) => {

    let shouldDraw = false;

    engine.setup = () => {
        engine.frameRate(60);
        const canvas = engine.createCanvas(required_width, required_height);
        canvas.parent('#app');
        engine.background('black');
        Remote.checkConnection((res) => document.getElementById('status').innerText = res.isAlive);
        document.getElementById('reset').onclick = () => {
            engine.background('black')
        }

        document.getElementById('send').onclick = () => {
            engine.loadPixels();
            let image = engine.pixels;
            history.push(Image.create(image, required_width, required_height));
        }
    }

    engine.draw = () => {
        engine.stroke('white').fill('white');
        if (shouldDraw) {
            engine.circle(engine.mouseX, engine.mouseY, 2)
        }
    }


    engine.mousePressed = () => {
        shouldDraw = true;
    }

    engine.mouseReleased = () => {
        shouldDraw = false;
    }
}



new P5(init);