import React, {useState} from "react";


function generateSeats(rows, cols, priceRange) {
    const seats = [];
    for (let r = 1; r <= rows; r++) {
        for (let c = 1; c <= cols; c++) {
            seats.push({
                id: `${r}${String.fromCharCode(64 + c)}`, // 1A, 1B, 1C...
                row: r,
                col: c,
                size: ["small", "standard", "large"][Math.floor(Math.random() * 3)],
                price: Math.floor(Math.random() * (priceRange.max - priceRange.min) + priceRange.min),
                status: ["available", "reserved", "sold"][Math.floor(Math.random() * 3)]
            });
        }
    }
    return seats;
}

export const halls = [
    {
        id: 1,
        name: "Концертный зал",
        width: 800,
        height: 600,
        sections: [
            {
                id: 1,
                name: "Партер",
                rows: 10,
                cols: 20,
                seats: generateSeats(10, 20, {min: 300, max: 800})
            }
        ]
    },
    {
        id: 2,
        name: "Театральный зал",
        width: 900,
        height: 700,
        sections: [
            {
                id: 2,
                name: "Балкон",
                rows: 8,
                cols: 15,
                seats: generateSeats(8, 15, {min: 200, max: 600})
            }
        ]
    },
    {
        id: 3,
        name: "Спортивный стадион",
        width: 1200,
        height: 800,
        sections: [
            {
                id: 3,
                name: "VIP-ложа",
                rows: 5,
                cols: 10,
                seats: generateSeats(5, 10, {min: 1000, max: 2000})
            }
        ]
    }
];



// Компонент для отдельного места
const Seat = ({ seat, onClick }) => {
    return (
        <rect
            x={seat.col * 30}
            y={seat.row * 30}
            width={25}
            height={25}
            fill={seat.status === "available" ? "green" : seat.status === "reserved" ? "yellow" : "red"}
            stroke="black"
            onClick={() => onClick(seat)}
        />
    );
};

// Компонент для секции зала
const Section = ({ section, onSeatClick }) => {
    return (
        <g>
            {section.seats.map((seat) => (
                <Seat key={seat.id} seat={seat} onClick={onSeatClick} />
            ))}
        </g>
    );
};

// Панель для добавления мест
const AddSeatPanel = ({ onAddSeat, onAddRect }) => {
    const [row, setRow] = useState(1);
    const [col, setCol] = useState(1);
    const [rows, setRows] = useState(1);
    const [cols, setCols] = useState(1);
    const [size, setSize] = useState("standard");
    const [price, setPrice] = useState(500);
    const [status, setStatus] = useState("available");

    const handleSingleAdd = (e) => {
        e.preventDefault();
        onAddSeat({ id: `${row}${col}`, row, col, size, price, status });
    };

    const handleRectAdd = (e) => {
        e.preventDefault();
        onAddRect({ row, col, rows, cols, size, price, status });
    };

    return (
        <div>
            <form onSubmit={handleSingleAdd}>
                <h3>Добавить одно место</h3>
                <label>Ряд: <input type="number" value={row} onChange={(e) => setRow(Number(e.target.value))} /></label>
                <label>Колонка: <input type="number" value={col} onChange={(e) => setCol(Number(e.target.value))} /></label>
                <button type="submit">Добавить</button>
            </form>
            <form onSubmit={handleRectAdd}>
                <h3>Добавить прямоугольник мест</h3>
                <label>Стартовый ряд: <input type="number" value={row} onChange={(e) => setRow(Number(e.target.value))} /></label>
                <label>Стартовая колонка: <input type="number" value={col} onChange={(e) => setCol(Number(e.target.value))} /></label>
                <label>Количество рядов: <input type="number" value={rows} onChange={(e) => setRows(Number(e.target.value))} /></label>
                <label>Количество колонок: <input type="number" value={cols} onChange={(e) => setCols(Number(e.target.value))} /></label>
                <button type="submit">Добавить блок мест</button>
            </form>
        </div>
    );
};

// Компонент для управления схемой зала
export function SeatMap({ hall }) {
    const [sections, setSections] = useState(hall.sections);

    const handleAddSeat = (newSeat) => {
        setSections((prevSections) => {
            return prevSections.map((section) => {
                if (section.id === hall.sections[0].id) {
                    return { ...section, seats: [...section.seats, newSeat] };
                }
                return section;
            });
        });
    };

    const handleAddRect = ({ row, col, rows, cols, size, price, status }) => {
        const newSeats = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                newSeats.push({ id: `${row + r}${col + c}`, row: row + r, col: col + c, size, price, status });
            }
        }
        setSections((prevSections) => {
            return prevSections.map((section) => {
                if (section.id === hall.sections[0].id) {
                    return { ...section, seats: [...section.seats, ...newSeats] };
                }
                return section;
            });
        });
    };

    return (
        <div>
            <AddSeatPanel onAddSeat={handleAddSeat} onAddRect={handleAddRect} />
            <svg width={hall.width} height={hall.height} style={{ border: "1px solid black" }}>
                {sections.map((section) => (
                    <Section key={section.id} section={section} />
                ))}
            </svg>
        </div>
    );
};



