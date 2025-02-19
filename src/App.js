import SeatMapKonva from "./components/SeatMapKonva";
import SeatMapSVG from "./components/SeatMapSvg";

function App() {
    return (
        <div>
            <h1>Тест схемы зала</h1>
            <h2>React Konva</h2>
            <SeatMapKonva />

            <h2>SVG + D3.js</h2>
            <SeatMapSVG />
        </div>
    );
}

export default App;