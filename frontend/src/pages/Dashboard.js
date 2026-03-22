import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";


function Dashboard() {
    const [leads, setLeads] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const [form, setForm] = useState({
        name: "",
        email: "",
        source: ""
    });

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

    // Add Lead
    const addLead = async () => {
        try {
            await API.post("/leads", form);
            setShowForm(false);
            setForm({ name: "", email: "", source: "" });
            fetchLeads();
        } catch (err) {
            alert("Error adding lead");
        }
    };

    // Update Status
    const updateStatus = async (id, status) => {
        try {
            await API.put(`/leads/${id}`, { status });
            fetchLeads();
        } catch (err) {
            alert("Error updating status");
        }
    };

    // Delete Lead
    const deleteLead = async (id) => {
        try {
            await API.delete(`/leads/${id}`);
            fetchLeads();
        } catch (err) {
            alert("Error deleting lead");
        }
    };

    // Stats
    const total = leads.length;
    const newLeads = leads.filter(l => l.status === "New").length;
    const contacted = leads.filter(l => l.status === "Contacted").length;
    const converted = leads.filter(l => l.status === "Converted").length;

    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">CRM Dashboard</h1>

                    <button
                        onClick={() => setShowForm(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                    + Add Lead
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-gray-500">Total</h2>
                    <p className="text-xl font-bold">{total}</p>
                </div>

                <div className="bg-blue-100 p-4 rounded shadow">
                    <h2 className="text-blue-600">New</h2>
                    <p className="text-xl font-bold">{newLeads}</p>
                </div>

                <div className="bg-yellow-100 p-4 rounded shadow">
                    <h2 className="text-yellow-600">Contacted</h2>
                    <p className="text-xl font-bold">{contacted}</p>
                </div>

                <div className="bg-green-100 p-4 rounded shadow">
                    <h2 className="text-green-600">Converted</h2>
                    <p className="text-xl font-bold">{converted}</p>
                </div>

            </div>

            {/* Add Lead Modal */}
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">

                    <div className="bg-white p-6 rounded shadow w-96">
                        <h2 className="text-xl mb-4 font-semibold">Add Lead</h2>

                        <input
                            placeholder="Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full border p-2 mb-3 rounded"
                        />

                        <input
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full border p-2 mb-3 rounded"
                        />

                        <input
                            placeholder="Source"
                            value={form.source}
                            onChange={(e) => setForm({ ...form, source: e.target.value })}
                            className="w-full border p-2 mb-3 rounded"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowForm(false)}
                                className="px-3 py-2 bg-gray-400 text-white rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={addLead}
                                className="px-3 py-2 bg-green-500 text-white rounded"
                            >
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            )}


            {/* Leads Table */}
            {/* Leads Table */}
            <div className="bg-white p-4 rounded shadow">

                <div className="flex justify-between mb-4">

                    <input
                        placeholder="Search by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border p-2 rounded w-1/3"
                    />

                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="All">All</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                    </select>

                </div>

                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {leads
                            .filter((lead) =>
                                lead.name.toLowerCase().includes(search.toLowerCase())
                            )
                            .filter((lead) =>
                                filter === "All" ? true : lead.status === filter
                            )
                            .map((lead) => (
                                <tr key={lead._id}>

                                    <td className="p-2 border">{lead.name}</td>
                                    <td className="p-2 border">{lead.email}</td>

                                    {/* Status Dropdown */}
                                    <td className="p-2 border">
                                        <select
                                            value={lead.status}
                                            onChange={(e) => updateStatus(lead._id, e.target.value)}
                                            className="border p-1 rounded"
                                        >
                                            <option>New</option>
                                            <option>Contacted</option>
                                            <option>Converted</option>
                                        </select>
                                    </td>

                                    {/* Actions */}
                                    <td className="p-2 border">
                                        <button
                                            onClick={() => deleteLead(lead._id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))}
                    </tbody>

                </table>
            </div>

        </div>
        </Layout >
    );
}

export default Dashboard;