import React, { useEffect, useState } from "react";
import { RfidData } from "../types/rfidData";
import { fetchRfidData } from "../services/api";

const RfidTable: React.FC = () => {
  const [rfidData, setRfidData] = useState<RfidData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchRfidData();
      setRfidData(data);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-gray-600">Cargando datos...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 max-w-screen-md p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Datos RFID</h1>
        </div>
        
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    UID
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rfidData.map((item) => (
                  <tr key={item.uid} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.uid}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {rfidData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No hay datos disponibles
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RfidTable;