import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Leads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads");
      setLeads(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Leads</h1>

      <div className="bg-white p-4 rounded shadow">

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td className="p-2 border">{lead.name}</td>
                <td className="p-2 border">{lead.email}</td>
                <td className="p-2 border">{lead.status}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </Layout>
  );
}

export default Leads;