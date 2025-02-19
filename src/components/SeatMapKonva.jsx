import React, {useState, useRef, useEffect} from "react";
import { Stage, Layer, Rect } from "react-konva";

const SeatMapKonva = () => {
    const rows = 10;
    const cols = 10;
    const seatSize = 40;
    const gap = 5;

    const stageRef = useRef(null);
    const [selectedSeats, setSelectedSeats] = useState({});
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleSeatClick = (row, col) => {
        const seatId = `seat_${row}-${col}`;
        setSelectedSeats((prevSelected) => ({
            ...prevSelected,
            [seatId]: !prevSelected[seatId],  // Инвертируем состояние
        }));
    };

    const handleWheel = (e) => {
        e.evt.preventDefault();
        const stage = stageRef.current;
        const scaleBy = 1.1;
        const oldScale = stage.scaleX();
        const pointer = stage.getPointerPosition();

        const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
        setScale(newScale);
        const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };
        setPosition({
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        });
    };

    return (
        <Stage
            width={500}
            height={500}
            ref={stageRef}
            scaleX={scale}
            scaleY={scale}
            x={position.x}
            y={position.y}
            draggable
            onWheel={handleWheel}
            onDragEnd={(e) => setPosition({ x: e.target.x(), y: e.target.y() })}
            style={{ cursor: "pointer" }}
        >
            <Layer>
                {Array.from({ length: rows }).map((_, row) =>
                    Array.from({ length: cols }).map((_, col) => {
                        const x = col * (seatSize + gap);
                        const y = row * (seatSize + gap);
                        const seatId = `seat_${row}-${col}`;
                        return (
                            <Rect
                                key={seatId}
                                x={x}
                                y={y}
                                width={seatSize}
                                height={seatSize}
                                fill={selectedSeats[seatId] ? "#0000FF" : "#FF0000"} // Цвет в зависимости от состояния
                                stroke="black"
                                strokeWidth={1}
                                cornerRadius={5}
                                onMouseDown={() => handleSeatClick(row, col)}
                                style={{ cursor: "pointer" }}
                            />
                        );
                    })
                )}
            </Layer>
        </Stage>
    );
};

export default SeatMapKonva;