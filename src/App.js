import React, { useState } from "react";
import {SeatMap, halls} from "./components/SeatMap";

const App = () => {
    const [selectedHall, setSelectedHall] = useState(halls[0]); // Выбираем первый зал по умолчанию

    return (
        <div>
            <h1>Конструктор зала</h1>
            <select onChange={(e) => setSelectedHall(halls.find(h => h.id === Number(e.target.value)))}>
                {halls.map((hall) => (
                    <option key={hall.id} value={hall.id}>
                        {hall.name}
                    </option>
                ))}
            </select>
            <SeatMap hall={selectedHall} />
        </div>
    );
};

export default App;