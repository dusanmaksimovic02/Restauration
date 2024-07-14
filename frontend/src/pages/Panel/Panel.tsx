import "./Panel.css";
import { FaUserAlt, FaUserEdit } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/useAuth";

type Props = {};

type Order = {
  id: number;
  vremePripreme: number;
  cena: number;
  status: number;
};

type Employee = {
  id: number;
  userName: string;
  ime: string;
  prezime: string;
  grad: string;
  adresa: string;
  pol: string;
  email: string;
  telefon: string;
  datumZaposljavanja: string;
  zaposlenDo: string;
  plata: number;
};

type User = {
  id: number;
  userName: string;
  ime: string;
  prezime: string;
  grad: string;
  adresa: string;
  pol: string;
  email: string;
  telefon: string;
  role: string;
};

type Sto = {
  id: number;
  naziv: string;
  kapacitet: number;
};

type Recenzija = {
  id: number;
  ocena: number;
  naslov: string;
  datumPostavljanja: string;
  tekst: string;
};

type Hrana = {
  id: number;
  stastojci: string;
  vremePripreme: number;
  naziv: string;
  kolicina: number;
  cena: number;
  slikaUrl: string;
};

type Pice = {
  id: number;
  naziv: string;
  kolicina: number;
  cena: number;
  slikaUrl: string;
};

type FormType =
  | "user"
  | "employee"
  | "menu"
  | "orders"
  | "tables"
  | "recenzije";

const Panel = (props: Props) => {
  const [currentForm, setCurrentForm] = useState<FormType>("user");
  const [usersData, setUsersData] = useState<User[]>([]);
  const [stoData, setStoData] = useState<Sto[]>([]);
  const [recenzijaData, setRecenzijaData] = useState<Recenzija[]>([]);
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);
  const [hranaData, setHranaData] = useState<Hrana[]>([]);
  const [piceData, setPiceData] = useState<Pice[]>([]);
  const [orderData, setOrderData] = useState<Order[]>([]);
  const apiUrl = "http://localhost:5104/";
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<{ [key: number]: string }>(
    {}
  );
  const { role } = useAuth();

  const [newTable, setNewTable] = useState<Partial<Sto>>({
    naziv: "",
    kapacitet: 0,
  });
  const [selectedSto, setSelectedSto] = useState<Partial<Sto>>({
    id: undefined,
    naziv: "",
    kapacitet: 0,
  });
  const handleEditButtonClick = (sto: Sto) => {
    setSelectedSto(sto);
    setIsEditPopupOpen(true);
  };
  const [isPopupHranaOpen, setIsPopupHranaOpen] = useState<boolean>(false);
  const [newHrana, setNewHrana] = useState<Partial<Hrana>>({
    stastojci: "",
    vremePripreme: 0,
    naziv: "",
    kolicina: 0,
    cena: 0,
    slikaUrl: "",
  });
  const [selectedHrana, setSelectedHrana] = useState<Partial<Hrana>>({
    id: undefined,
    stastojci: "",
    vremePripreme: 0,
    naziv: "",
    kolicina: 0,
    cena: 0,
    slikaUrl: "",
  });
  const handleEditHranaButtonClick = (hrana: Hrana) => {
    setSelectedHrana(hrana);
    setIsEditPopupOpen(true);
  };
  const [isPopupPiceOpen, setIsPopupPiceOpen] = useState<boolean>(false);
  const [newPice, setNewPice] = useState<Partial<Pice>>({
    naziv: "",
    kolicina: 0,
    cena: 0,
    slikaUrl: "",
  });
  const [selectedPice, setSelectedPice] = useState<Partial<Pice>>({
    id: undefined,
    naziv: "",
    kolicina: 0,
    cena: 0,
    slikaUrl: "",
  });
  const handleEditPiceButtonClick = (pice: Pice) => {
    setSelectedPice(pice);
    setIsEditPopupOpen(true);
  };
  const [selectedUser, setSelectedUser] = useState<Partial<User>>({
    id: undefined,
    userName: "",
    ime: "",
    prezime: "",
    grad: "",
    adresa: "",
    pol: "",
    email: "",
    telefon: "",
  });

  const handleEditUserButtonClick = (user: User) => {
    setSelectedUser(user);
    setIsEditPopupOpen(true);
  };

  const handleRoleChange = (id: number, role: string) => {
    setSelectedRole((prevState) => ({
      ...prevState,
      [id]: role,
    }));
  };

  const handleAddRoleToUser = async (id: number) => {
    const role = selectedRole[id];
    if (!role) {
      alert("Please select a role");
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}api/RoleBased/AddRoleToUser`,
        null,
        {
          params: { userId: id, role: role },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error adding role to user:", error);
    }
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(apiUrl + "Zaposleni/Zaposleni");
        setEmployeeData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchEmployeeData();
  }, []);

  const [selectedEmployee, setSelectedEmployee] = useState<Partial<Employee>>({
    id: undefined,
    userName: "",
    ime: "",
    prezime: "",
    grad: "",
    adresa: "",
    pol: "",
    email: "",
    telefon: "",
    datumZaposljavanja: "",
    zaposlenDo: "",
    plata: 0,
  });

  const handleEditEmployeeButtonClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditPopupOpen(true);
  };

  const handleUpdateEmployee = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}Zaposleni/IzmeniZaposlenog`,
        selectedEmployee
      );

      if (response.status === 200) {
        setEmployeeData((prevData) =>
          prevData.map((employee) =>
            employee.id === selectedEmployee.id
              ? { ...employee, ...selectedEmployee }
              : employee
          )
        );

        setIsEditPopupOpen(false);

        setSelectedEmployee({
          id: undefined,
          userName: "",
          ime: "",
          prezime: "",
          grad: "",
          adresa: "",
          pol: "",
          email: "",
          telefon: "",
          datumZaposljavanja: "",
          zaposlenDo: "",
          plata: 0,
        });

        console.log(response.data);
      } else {
        throw new Error("Error updating table");
      }
    } catch (error) {
      console.error("Error updating table:", error);
    }
  };

  const handleDeleteEmployeeData = async (id: number) => {
    try {
      await axios.post(
        `http://localhost:5104/api/RoleBased/AddRoleToUser`,
        null,
        {
          params: { userId: id, role: "Musterija" },
        }
      );
      setEmployeeData((prevData) =>
        prevData.filter((employee) => employee.id !== id)
      );
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleUpdateSto = async () => {
    try {
      const response = await axios.put(`${apiUrl}Sto/IzmeniSto`, selectedSto);

      if (response.status === 200) {
        setStoData((prevData) =>
          prevData.map((sto) =>
            sto.id === selectedSto.id ? { ...sto, ...selectedSto } : sto
          )
        );

        setIsEditPopupOpen(false);

        setSelectedSto({ id: undefined, naziv: "", kapacitet: 0 });

        console.log(response.data);
      } else {
        throw new Error("Error updating table");
      }
    } catch (error) {
      console.error("Error updating table:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + "Musterija/Musterije");
        setUsersData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUserData = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}User/ObrisiOsobu/${id}`);
      setUsersData((prevData) => prevData.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}Musterija/IzmeniMusteriju`,
        selectedUser
      );

      if (response.status === 200) {
        setUsersData((prevData) =>
          prevData.map((user) =>
            user.id === selectedUser.id ? { ...user, ...selectedUser } : user
          )
        );

        setIsEditPopupOpen(false);

        setSelectedUser({
          id: undefined,
          userName: "",
          ime: "",
          prezime: "",
          grad: "",
          adresa: "",
          pol: "",
          email: "",
          telefon: "",
        });

        console.log(response.data);
      } else {
        throw new Error("Error updating table");
      }
    } catch (error) {
      console.error("Error updating table:", error);
    }
  };

  useEffect(() => {
    const fetchStoData = async () => {
      try {
        const response = await axios.get(apiUrl + "Sto/Stolovi");
        setStoData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchStoData();
  }, []);

  const handleDeleteSto = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}Sto/IzbrisiSto/${id}`);
      setStoData((prevData) => prevData.filter((sto) => sto.id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleAddSto = async () => {
    try {
      const response = await axios.post(apiUrl + "Sto/DodajSto", newTable);
      setStoData((prevData) => [...prevData, response.data]);
      setNewTable({ naziv: "", kapacitet: 0 });
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error adding table:", error);
    }
  };

  useEffect(() => {
    const fetchRecenzijaData = async () => {
      try {
        const response = await axios.get(apiUrl + "Recenzija/Recenzija");
        setRecenzijaData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchRecenzijaData();
  }, []);

  const handleDeleteRecenzija = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}Recenzija/IzbrisiRecenziju/${id}`);
      setRecenzijaData((prevData) =>
        prevData.filter((recenzija) => recenzija.id !== id)
      );
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  useEffect(() => {
    const fetchPiceData = async () => {
      try {
        const response = await axios.get(apiUrl + "Pice/Pice");
        setPiceData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchPiceData();
  }, []);

  const handleDeletePice = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}Pice/IzbrisiPice/${id}`);
      setPiceData((prevData) => prevData.filter((pice) => pice.id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleAddPice = async () => {
    try {
      const response = await axios.post(apiUrl + "Pice/DodajPice", newPice);
      setPiceData((prevData) => [...prevData, response.data]);
      setNewPice({
        naziv: "",
        kolicina: 0,
        cena: 0,
        slikaUrl: "",
      });
      setIsPopupPiceOpen(false);
    } catch (error) {
      console.error("Error adding Pice:", error);
    }
  };

  const handleUpdatePice = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}Pice/IzmeniPice`,
        selectedPice
      );

      if (response.status === 200) {
        setPiceData((prevData) =>
          prevData.map((pice) =>
            pice.id === selectedPice.id ? { ...pice, ...selectedPice } : pice
          )
        );

        setIsEditPopupOpen(false);

        setSelectedPice({
          id: undefined,

          naziv: "",
          kolicina: 0,
          cena: 0,
          slikaUrl: "",
        });

        console.log(response.data);
      } else {
        throw new Error("Error updating table");
      }
    } catch (error) {
      console.error("Error updating table:", error);
    }
  };

  useEffect(() => {
    const fetchHranaData = async () => {
      try {
        const response = await axios.get(apiUrl + "Hrana/Hrana");
        setHranaData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchHranaData();
  }, []);

  const handleDeleteHrana = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}Hrana/IzbrisiHranu/${id}`);
      setHranaData((prevData) => prevData.filter((hrana) => hrana.id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleAddHrana = async () => {
    try {
      const hranaToAdd = {
        ...newHrana,
        stastojci: newHrana.stastojci?.split(",").map((s) => s.trim()),
      };
      const response = await axios.post(
        apiUrl + "Hrana/DodajHranu",
        hranaToAdd
      );
      setHranaData((prevData) => [...prevData, response.data]);
      setNewHrana({
        stastojci: "",
        vremePripreme: 0,
        naziv: "",
        kolicina: 0,
        cena: 0,
        slikaUrl: "",
      });
      setIsPopupHranaOpen(false);
    } catch (error) {
      console.error("Error adding Hrana:", error);
    }
  };

  const handleUpdateHrana = async () => {
    try {
      const hranaToUpdate = {
        ...selectedHrana,
        stastojci: selectedHrana.stastojci?.split(",").map((s) => s.trim()),
      };
      const response = await axios.put(
        `${apiUrl}Hrana/IzmeniHranu`,
        hranaToUpdate
      );

      if (response.status === 200) {
        setHranaData((prevData) =>
          prevData.map((hrana) =>
            hrana.id === selectedHrana.id
              ? { ...hrana, ...selectedHrana }
              : hrana
          )
        );

        setIsEditPopupOpen(false);

        setSelectedHrana({
          id: undefined,
          stastojci: "",
          vremePripreme: 0,
          naziv: "",
          kolicina: 0,
          cena: 0,
          slikaUrl: "",
        });

        console.log(response.data);
      } else {
        throw new Error("Error updating table");
      }
    } catch (error) {
      console.error("Error updating table:", error);
    }
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(apiUrl + "Narudzbina/Narudzbine");
        setOrderData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchOrderData();
  }, []);

  const handleDeleteOrder = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}Narudzbina/IzbrisiNArudzbinu/${id}`);
      setOrderData((prevData) => prevData.filter((order) => order.id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const renderUserForm = () => {
    return (
      <div className="user-form bg-dark " style={{ width: "100%" }}>
        <table className="user-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Ime</th>
              <th>Prezime</th>
              <th>Grad</th>
              <th>Adresa</th>
              <th>Pol</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>DodajRole</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.userName}</td>
                <td>{user.ime}</td>
                <td>{user.prezime}</td>
                <td>{user.grad}</td>
                <td>{user.adresa}</td>
                <td>{user.pol}</td>
                <td>{user.email}</td>
                <td>{user.telefon}</td>
                <td>
                  <select
                    value={selectedRole[user.id] || ""}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="">Select Role</option>
                    <option value="Menadzer">Menadzer</option>
                    <option value="Kuvar">Kuvar</option>
                    <option value="Konobar">Konobar</option>
                    <option value="Sanker">Sanker</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-outline-warning"
                    onClick={() => handleAddRoleToUser(user.id)}
                  >
                    Add Role
                  </button>
                </td>
                <td>
                  {role === "Admin" && (
                    <button
                      type="button"
                      className="btn btn-outline-warning izmenibtn"
                      onClick={() => handleEditUserButtonClick(user)}
                    >
                      Izmeni Korisnika
                    </button>
                  )}
                  {isEditPopupOpen && (
                    <div className="popup-form">
                      <div className="popup-content">
                        <h3>Izmeni Korisnika</h3>
                        <label>
                          User name:
                          <input
                            type="text"
                            value={selectedUser.userName}
                            onChange={(e) =>
                              setSelectedUser({
                                ...selectedUser,
                                userName: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Ime:
                          <input
                            type="text"
                            value={selectedUser.ime}
                            onChange={(e) =>
                              setSelectedUser({
                                ...selectedUser,
                                ime: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Prezime:
                          <input
                            type="text"
                            value={selectedUser.prezime}
                            onChange={(e) =>
                              setSelectedUser({
                                ...selectedUser,
                                prezime: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Grad:
                          <input
                            type="text"
                            value={selectedUser.grad}
                            onChange={(e) =>
                              setSelectedUser({
                                ...selectedUser,
                                grad: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Adresa:
                          <input
                            type="text"
                            value={selectedUser.adresa}
                            onChange={(e) =>
                              setSelectedUser({
                                ...selectedUser,
                                adresa: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Pol:
                          <input
                            type="text"
                            value={selectedUser.pol}
                            onChange={(e) =>
                              setSelectedUser({
                                ...selectedUser,
                                pol: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          E-mail:
                          <input
                            type="text"
                            value={selectedUser.email}
                            onChange={(e) =>
                              setSelectedUser({
                                ...selectedUser,
                                email: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Telefon:
                          <input
                            type="text"
                            value={selectedUser.telefon}
                            onChange={(e) =>
                              setSelectedUser({
                                ...selectedUser,
                                telefon: e.target.value,
                              })
                            }
                          />
                        </label>
                        <button onClick={handleUpdateUser}>Sačuvaj</button>
                        <button onClick={() => setIsEditPopupOpen(false)}>
                          Zatvori
                        </button>
                      </div>
                    </div>
                  )}
                  {role === "Admin" && (
                    <button
                      type="button"
                      className="btn btn-outline-danger delbtn"
                      onClick={() => handleDeleteUserData(user.id)}
                    >
                      Obrisi Korisnika
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderEmployeeForm = () => {
    return (
      <div className="user-form bg-dark" style={{ width: "100%" }}>
        <table className="employee-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Ime</th>
              <th>Prezime</th>
              <th>Grad</th>
              <th>Adresa</th>
              <th>Pol</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Datum Zaposljavanja</th>
              <th>Zaposljen Do</th>
              <th>Plata</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.userName}</td>
                <td>{employee.ime}</td>
                <td>{employee.prezime}</td>
                <td>{employee.grad}</td>
                <td>{employee.adresa}</td>
                <td>{employee.pol}</td>
                <td>{employee.email}</td>
                <td>{employee.telefon}</td>
                <td>{employee.datumZaposljavanja}</td>
                <td>{employee.zaposlenDo}</td>
                <td>{employee.plata}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-warning izmenibtn"
                    onClick={() => handleEditEmployeeButtonClick(employee)}
                  >
                    Izmeni Zaposlenog
                  </button>
                  {isEditPopupOpen && (
                    <div className="popup-form">
                      <div className="popup-content">
                        <h3>Izmeni Zaposlenog</h3>
                        <label>
                          User name:
                          <input
                            type="text"
                            value={selectedEmployee.userName}
                            onChange={(e) =>
                              setSelectedEmployee({
                                ...selectedEmployee,
                                userName: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Ime:
                          <input
                            type="text"
                            value={selectedEmployee.ime}
                            onChange={(e) =>
                              setSelectedEmployee({
                                ...selectedEmployee,
                                ime: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Prezime:
                          <input
                            type="text"
                            value={selectedEmployee.prezime}
                            onChange={(e) =>
                              setSelectedEmployee({
                                ...selectedEmployee,
                                prezime: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Grad:
                          <input
                            type="text"
                            value={selectedEmployee.grad}
                            onChange={(e) =>
                              setSelectedEmployee({
                                ...selectedEmployee,
                                grad: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Adresa:
                          <input
                            type="text"
                            value={selectedEmployee.adresa}
                            onChange={(e) =>
                              setSelectedEmployee({
                                ...selectedEmployee,
                                adresa: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Pol:
                          <input
                            type="text"
                            value={selectedEmployee.pol}
                            onChange={(e) =>
                              setSelectedEmployee({
                                ...selectedEmployee,
                                pol: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          E-mail:
                          <input
                            type="text"
                            value={selectedEmployee.email}
                            onChange={(e) =>
                              setSelectedEmployee({
                                ...selectedEmployee,
                                email: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Telefon:
                          <input
                            type="text"
                            value={selectedEmployee.telefon}
                            onChange={(e) =>
                              setSelectedEmployee({
                                ...selectedEmployee,
                                telefon: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Datum Zaposljavanja:
                          <input
                            type="text"
                            value={selectedEmployee.datumZaposljavanja}
                            onChange={(e) =>
                              setSelectedEmployee({
                                ...selectedEmployee,
                                datumZaposljavanja: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Zaposlen do:
                          <input
                            type="text"
                            value={selectedEmployee.zaposlenDo}
                            onChange={(e) =>
                              setSelectedEmployee({
                                ...selectedEmployee,
                                zaposlenDo: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Plata:
                          <input
                            type="number"
                            value={selectedEmployee.plata}
                            onChange={(e) =>
                              setSelectedEmployee({
                                ...selectedEmployee,
                                plata: parseInt(e.target.value, 10),
                              })
                            }
                          />
                        </label>
                        <button onClick={handleUpdateEmployee}>Sačuvaj</button>
                        <button onClick={() => setIsEditPopupOpen(false)}>
                          Zatvori
                        </button>
                      </div>
                    </div>
                  )}
                  {role === "Admin" && (
                    <button
                      type="button"
                      className="btn btn-outline-danger delbtn"
                      onClick={() => handleDeleteEmployeeData(employee.id)}
                    >
                      Obrisi Zaposlenog
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderMenuForm = () => {
    return (
      <div className="user-form bg-dark" style={{ width: "100%" }}>
        <table className="hrana-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Sastojci</th>
              <th>Vreme Pripreme</th>
              <th>Naziv</th>
              <th>Kolicina</th>
              <th>Cena</th>
              <th>Slika</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hranaData.map((hrana) => (
              <tr key={hrana.id}>
                <td>{hrana.id}</td>
                <td>{hrana.stastojci}</td>
                <td>{hrana.vremePripreme}</td>
                <td>{hrana.naziv}</td>
                <td>{hrana.kolicina}</td>
                <td>{hrana.cena}</td>
                <td>{hrana.slikaUrl}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-warning izmenibtn"
                    onClick={() => handleEditHranaButtonClick(hrana)}
                  >
                    Izmeni Hranu
                  </button>
                  {isEditPopupOpen && (
                    <div className="popup-form">
                      <div className="popup-content">
                        <h3>Izmeni Hranu</h3>
                        <label>
                          Sastojci:
                          <input
                            type="text"
                            value={selectedHrana.stastojci}
                            onChange={(e) =>
                              setSelectedHrana({
                                ...selectedHrana,
                                stastojci: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Vreme pripreme:
                          <input
                            type="number"
                            value={selectedHrana.vremePripreme}
                            onChange={(e) =>
                              setSelectedHrana({
                                ...selectedHrana,
                                vremePripreme: parseInt(e.target.value, 10),
                              })
                            }
                          />
                        </label>
                        <label>
                          Naziv:
                          <input
                            type="text"
                            value={selectedHrana.naziv}
                            onChange={(e) =>
                              setSelectedHrana({
                                ...selectedHrana,
                                naziv: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Kolicina:
                          <input
                            type="number"
                            value={selectedHrana.kolicina}
                            onChange={(e) =>
                              setSelectedHrana({
                                ...selectedHrana,
                                kolicina: parseInt(e.target.value, 10),
                              })
                            }
                          />
                        </label>
                        <label>
                          Cena:
                          <input
                            type="number"
                            value={selectedHrana.cena}
                            onChange={(e) =>
                              setSelectedHrana({
                                ...selectedHrana,
                                cena: parseInt(e.target.value, 10),
                              })
                            }
                          />
                        </label>
                        <label>
                          Slika url:
                          <input
                            type="text"
                            value={selectedHrana.slikaUrl}
                            onChange={(e) =>
                              setSelectedHrana({
                                ...selectedHrana,
                                slikaUrl: e.target.value,
                              })
                            }
                          />
                        </label>
                        <button onClick={handleUpdateHrana}>Sačuvaj</button>
                        <button onClick={() => setIsEditPopupOpen(false)}>
                          Zatvori
                        </button>
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    className="btn btn-outline-danger delbtn"
                    onClick={() => handleDeleteHrana(hrana.id)}
                  >
                    Obrisi Hranu
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="hrana-buttons">
          <button
            type="button"
            className="btn btn-outline-success dodbtn"
            onClick={() => setIsPopupHranaOpen(true)}
          >
            Dodaj Hranu
          </button>
          {isPopupHranaOpen && (
            <div className="popup-form">
              <div className="popup-form-content">
                <h2>Dodaj Hranu</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddHrana();
                  }}
                >
                  <div className="form-group">
                    <label htmlFor="sastojci">Sastojci</label>
                    <input
                      type="text"
                      id="sastojci"
                      value={newHrana.stastojci}
                      onChange={(e) =>
                        setNewHrana({ ...newHrana, stastojci: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="vremePripreme">Vreme pripreme</label>
                    <input
                      type="number"
                      id="vremePripreme"
                      value={newHrana.vremePripreme}
                      onChange={(e) =>
                        setNewHrana({
                          ...newHrana,
                          vremePripreme: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="naziv">Naziv</label>
                    <input
                      type="text"
                      id="naziv"
                      value={newHrana.naziv}
                      onChange={(e) =>
                        setNewHrana({ ...newHrana, naziv: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="kolicina">Kolicina</label>
                    <input
                      type="number"
                      id="kolicina"
                      value={newHrana.kolicina}
                      onChange={(e) =>
                        setNewHrana({
                          ...newHrana,
                          kolicina: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cena">Cena</label>
                    <input
                      type="number"
                      id="cena"
                      value={newHrana.cena}
                      onChange={(e) =>
                        setNewHrana({
                          ...newHrana,
                          cena: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="slikaUrl">Url slike</label>
                    <input
                      type="text"
                      id="slikaUrl"
                      value={newHrana.slikaUrl}
                      onChange={(e) =>
                        setNewHrana({ ...newHrana, slikaUrl: e.target.value })
                      }
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Dodaj
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsPopupHranaOpen(false)}
                  >
                    Zatvori
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
        <table className="pice-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Naziv</th>
              <th>Kolicina</th>
              <th>Cena</th>
              <th>Slika</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {piceData.map((pice) => (
              <tr key={pice.id}>
                <td>{pice.id}</td>
                <td>{pice.naziv}</td>
                <td>{pice.kolicina}</td>
                <td>{pice.cena}</td>
                <td>{pice.slikaUrl}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-warning izmenibtn"
                    onClick={() => handleEditPiceButtonClick(pice)}
                  >
                    Izmeni pice
                  </button>
                  {isEditPopupOpen && (
                    <div className="popup-form">
                      <div className="popup-content">
                        <h3>Izmeni Pice</h3>

                        <label>
                          Naziv:
                          <input
                            type="text"
                            value={selectedPice.naziv}
                            onChange={(e) =>
                              setSelectedPice({
                                ...selectedPice,
                                naziv: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Kolicina:
                          <input
                            type="number"
                            value={selectedPice.kolicina}
                            onChange={(e) =>
                              setSelectedPice({
                                ...selectedPice,
                                kolicina: parseInt(e.target.value, 10),
                              })
                            }
                          />
                        </label>
                        <label>
                          Cena:
                          <input
                            type="number"
                            value={selectedPice.cena}
                            onChange={(e) =>
                              setSelectedPice({
                                ...selectedPice,
                                cena: parseInt(e.target.value, 10),
                              })
                            }
                          />
                        </label>
                        <label>
                          slika url:
                          <input
                            type="text"
                            value={selectedPice.slikaUrl}
                            onChange={(e) =>
                              setSelectedPice({
                                ...selectedPice,
                                slikaUrl: e.target.value,
                              })
                            }
                          />
                        </label>
                        <button onClick={handleUpdatePice}>Sačuvaj</button>
                        <button onClick={() => setIsEditPopupOpen(false)}>
                          Zatvori
                        </button>
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    className="btn btn-outline-danger delbtn"
                    onClick={() => handleDeletePice(pice.id)}
                  >
                    Obrisi pice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pice-buttons">
          <button
            type="button"
            className="btn btn-outline-success dodbtn"
            onClick={() => setIsPopupPiceOpen(true)}
          >
            Dodaj pice
          </button>
          {isPopupPiceOpen && (
            <div className="popup-form">
              <div className="popup-form-content">
                <h2>Dodaj Pice</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddPice();
                  }}
                >
                  <div className="form-group">
                    <label htmlFor="naziv">Naziv</label>
                    <input
                      type="text"
                      id="naziv"
                      value={newPice.naziv}
                      onChange={(e) =>
                        setNewPice({ ...newPice, naziv: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="kolicina">Kolicina</label>
                    <input
                      type="number"
                      id="kolicina"
                      value={newPice.kolicina}
                      onChange={(e) =>
                        setNewPice({
                          ...newPice,
                          kolicina: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cena">Cena</label>
                    <input
                      type="number"
                      id="cena"
                      value={newPice.cena}
                      onChange={(e) =>
                        setNewPice({
                          ...newPice,
                          cena: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="slikaUrl">Url sklike</label>
                    <input
                      type="text"
                      id="slikaUrl"
                      value={newPice.slikaUrl}
                      onChange={(e) =>
                        setNewPice({ ...newPice, slikaUrl: e.target.value })
                      }
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Dodaj
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsPopupPiceOpen(false)}
                  >
                    Zatvori
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderOrdersForm = () => {
    return (
      <div className="user-form bg-dark" style={{ width: "100%" }}>
        <table className="user-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Vreme</th>
              <th>Cena</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.vremePripreme}</td>
                <td>{order.cena}</td>
                <td>{order.status}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger delbtn"
                    onClick={() => handleDeleteOrder(order.id)}
                  >
                    Obrisi Narudzbinu
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderTablesForm = () => {
    return (
      <div className="user-form bg-dark" style={{ width: "100%" }}>
        <table className="user-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Naziv</th>
              <th>Kapacitet</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stoData.map((sto) => (
              <tr key={sto.id}>
                <td>{sto.id}</td>
                <td>{sto.naziv}</td>
                <td>{sto.kapacitet}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-warning izmenibtn"
                    onClick={() => handleEditButtonClick(sto)}
                  >
                    Izmeni Sto
                  </button>
                  {isEditPopupOpen && (
                    <div className="popup-form">
                      <div className="popup-content">
                        <h3>Izmeni Sto</h3>
                        <label>
                          Naziv:
                          <input
                            type="text"
                            value={selectedSto.naziv}
                            onChange={(e) =>
                              setSelectedSto({
                                ...selectedSto,
                                naziv: e.target.value,
                              })
                            }
                          />
                        </label>
                        <label>
                          Kapacitet:
                          <input
                            type="number"
                            value={selectedSto.kapacitet}
                            onChange={(e) =>
                              setSelectedSto({
                                ...selectedSto,
                                kapacitet: parseInt(e.target.value, 10),
                              })
                            }
                          />
                        </label>
                        <button onClick={handleUpdateSto}>Sačuvaj</button>
                        <button onClick={() => setIsEditPopupOpen(false)}>
                          Zatvori
                        </button>
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    className="btn btn-outline-danger delbtn"
                    onClick={() => handleDeleteSto(sto.id)}
                  >
                    Obrisi Sto
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-buttons">
          <button
            type="button"
            className="btn btn-outline-success dodbtn"
            onClick={() => setIsPopupOpen(true)}
          >
            Dodaj Sto
          </button>
          {isPopupOpen && (
            <div className="popup-form">
              <div className="popup-form-content">
                <h2>Dodaj Sto</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddSto();
                  }}
                >
                  <div className="form-group">
                    <label htmlFor="naziv">Naziv</label>
                    <input
                      type="text"
                      id="naziv"
                      value={newTable.naziv}
                      onChange={(e) =>
                        setNewTable({ ...newTable, naziv: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="kapacitet">Kapacitet</label>
                    <input
                      type="number"
                      id="kapacitet"
                      value={newTable.kapacitet}
                      onChange={(e) =>
                        setNewTable({
                          ...newTable,
                          kapacitet: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Dodaj
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsEditPopupOpen(false)}
                  >
                    Zatvori
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderRecenzijeForm = () => {
    return (
      <>
        {role === "Admin" ? (
          <div className="user-form bg-dark" style={{ width: "100%" }}>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Ocena</th>
                  <th>Datum</th>
                  <th>Naslov</th>
                  <th>Tekst</th>
                  <th>Akcije</th>
                </tr>
              </thead>
              <tbody>
                {recenzijaData.map((recenzije) => (
                  <tr key={recenzije.id}>
                    <td>{recenzije.id}</td>
                    <td>{recenzije.ocena}</td>
                    <td>{recenzije.datumPostavljanja}</td>
                    <td>{recenzije.naslov}</td>
                    <td>{recenzije.tekst}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger delbtn"
                        onClick={() => handleDeleteRecenzija(recenzije.id)}
                      >
                        Obrisi Recenziju
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div></div>
        )}
      </>
    );
  };

  const renderForm = (form: FormType) => {
    switch (form) {
      case "user":
        return renderUserForm();
      case "employee":
        return renderEmployeeForm();
      case "menu":
        return renderMenuForm();
      case "orders":
        return renderOrdersForm();
      case "tables":
        return renderTablesForm();
      case "recenzije":
        return renderRecenzijeForm();
      default:
        return renderUserForm();
    }
  };

  const renderSidebar = () => {
    return (
      <>
        <hr />
        <div className="menu-items">
          <div
            className="user-information"
            onClick={() => setCurrentForm("user")}
          >
            <FaUserAlt className="icon" />
            <p>Informacije korisnika</p>
          </div>
          <hr />
          <div className="edit-user" onClick={() => setCurrentForm("employee")}>
            <FaUserEdit className="icon" />
            <p>Informacije o zaposlenima</p>
          </div>
          <hr />
          <div className="notification" onClick={() => setCurrentForm("menu")}>
            <IoIosNotifications className="icon" />
            <p>Informacije o meniju</p>
          </div>
          <hr />
          <div className="orders" onClick={() => setCurrentForm("tables")}>
            <FaUserEdit className="icon" />
            <p>Stolovi</p>
          </div>
          <hr />
          <div className="orders" onClick={() => setCurrentForm("recenzije")}>
            <FaUserEdit className="icon" />
            <p>Recenzije</p>
          </div>
          <hr />
        </div>
      </>
    );
  };

  return (
    <div className="profile-page">
      <div className="sidebar bg-dark" style={{ justifyContent: "center" }}>
        {renderSidebar()}
      </div>
      <div className="forma">{renderForm(currentForm)}</div>
    </div>
  );
};

export default Panel;
