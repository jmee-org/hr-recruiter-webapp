import React, { useState, useEffect } from 'react';
import { Input, Button, Table } from 'antd';
import { getAllCandidates } from '../service/api';
import { Candidate } from '../interface/ICandidate';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
  },
  button: {
    marginLeft: '10px',
  },
  tableContainer: {
    marginTop: '20px',
  },
}));

const SearchComponent = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [searchResults, setSearchResults] = useState<Candidate[]>([]);
  const [totalResults, setTotalResults] = useState(0);

  const fetchData = async (page = 1, pageSize = 10) => {
    try {
      // Call your API to fetch all candidates without filters
      const results = await getAllCandidates({
        name,
        surname,
        country,
        city,
      });
      setSearchResults(results);
      setTotalResults(results.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      // Mock API call with filters (replace with your actual search API)
      const filteredResults = await getAllCandidates({
        name,
        surname,
        country,
        city,
      });
      setSearchResults(filteredResults);
      setTotalResults(filteredResults.length);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const columns = [
    // Customize the columns based on your API response
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Surname', dataIndex: 'surname', key: 'surname' },
    { title: 'Country', dataIndex: 'country', key: 'country' },
    { title: 'City', dataIndex: 'city', key: 'city' },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <Link to={`/candidates/${record.id}`}>
          <IconButton>
            <AccountBoxIcon />
          </IconButton>
        </Link>
      ),
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.inputContainer}>
        <Input
          className={classes.input}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          className={classes.input}
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <Input
          className={classes.input}
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <Input
          className={classes.input}
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button
          type="primary"
          className={classes.button}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      <div className={classes.tableContainer}>
        <Table
          dataSource={searchResults}
          columns={columns}
          pagination={{
            pageSize: 10,
            total: totalResults,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </div>
    </div>
  );
};

export default SearchComponent;