import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react";

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const [session, loading] = useSession();

    const [searchValue, setSearchValue] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    const [editingEntry, setEditingEntry] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedLastName, setEditedLastName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedCellphone, setEditedCellphone] = useState('');
    const [oldEmail, setOldEmail] = useState('');
  
    // Function to fetch search results from the API endpoint
    const fetchResults = async () => {
        try {
            const response = await axios.get('/api/gerente/pull-all-vendedores');
            setResults(response.data);
        } 
        catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
  
    // Fetch results when the component mounts
    useEffect(() => {
        fetchResults();
    }, []);

    useEffect(() => {
        setFilteredResults(
          results.filter((entry) =>
            entry.nombres.toLowerCase().includes(searchValue.toLowerCase())
          )
        );
      }, [results, searchValue]);

    // Function to delete an entry
    const deleteEntry = async (entry) => {
        try {
            await axios.delete('/api/gerente/eliminar-vendedor', { email: entry, agency: session.user.agency });
            // Refresh the results after deletion
            fetchResults();
        } 
        catch (error) {
            console.error('Error deleting entry:', error);
        }
    };

    // Function to open the editing section
    const editEntry = (entry) => {
        setEditingEntry(entry);
        setEditedName(entry.nombres);
        setEditedLastName(entry.apellidos);
        setEditedEmail(entry.email);
        setOldEmail(entry.email);
        setEditedCellphone(entry.telefono);
    };

    const handleNameChange = (event) => {
        setEditedName(event.target.value);
    };
      
    const handleLastNameChange = (event) => {
        setEditedLastName(event.target.value);
    };
      
    const handleEmailChange = (event) => {
        setEditedEmail(event.target.value);
    };
      
    const handleCellphoneChange = (event) => {
        setEditedCellphone(event.target.value);
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
      
        try {
            const updatedEntry = {
                ...editingEntry,
                name: editedName,
                last_name: editedLastName,
                newEmail: editedEmail,
                oldEmail: oldEmail,
                cellphone: editedCellphone,
            };

            await axios.put('/api/gerente/actualizar-vendedor', updatedEntry);
            // Refresh the results after updating
            fetchResults();
            // Close the overlay after updating
            closeOverlay(); 
        } 
        catch (error) {
            console.error('Error updating entry:', error);
        }
      };

    // Function to close the overlay
    const closeOverlay = () => {
        setEditingEntry(null);
        setEditedName('');
        setEditedLastName('');
        setEditedEmail('');
        setOldEmail('');
        setEditedCellphone('');
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
      };

    return (

        <div>
            <div>
                <h1>Buscar</h1>
                <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Buscar..."
                />
                <a href='/seller/seller_signup'>
                    <button> [+] </button>
                </a>
            </div>

            <ul>
                {filteredResults.map((entry) => (
                <li key={entry._id}>
                    <div>
                        <strong>Name:</strong> {entry.nombres}
                    </div>

                    <div>
                        <strong>Last Name:</strong> {entry.apellidos}
                    </div>

                    <div>
                        <strong>Email:</strong> {entry.email}
                    </div>

                    <div>
                        <strong>Cellphone:</strong> {entry.telefono}
                    </div>

                    <button onClick={() => deleteEntry(entry.email)}>Delete</button>
                    <button onClick={() => editEntry(entry)}>Edit</button>
                </li>
                ))}
            </ul>

            {editingEntry && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>Edit Entry</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Nombre:
                                <input type="text" value={editedName} onChange={handleNameChange} />
                            </label>
                            <label>
                                Apellido:
                                <input type="text" value={editedLastName} onChange={handleLastNameChange} />
                            </label>
                            <label>
                                Email:
                                <input type="text" value={editedEmail} onChange={handleEmailChange} />
                            </label>
                            <label>
                                Teléfono:
                                <input type="text" value={editedCellphone} onChange={handleCellphoneChange} />
                            </label>
                            <button type="submit">Guardar</button>
                            <button onClick={closeOverlay}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
    
export default SearchResults;
    