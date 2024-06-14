import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IconButton,
  InputAdornment,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Tooltip,
  Chip,
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import HabitCard from "../features/habit/HabitCard";
import GoalCard from "../features/goal/GoalCard";
import { searchHabits } from "../features/habit/habitSlice";
import { searchGoals } from "../features/goal/goalSlice";
import { fetchTagWithHabitGoal, fetchTags } from "../features/tag/tagSlice";


function SearchInput({ handleSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("habit"); // Default search type
  const [results, setResults] = useState([]);
  const [clickTag, setClickTag] = useState(false);
  const [searchPerformed, setSearchPerformed] = React.useState(false);
  const tags = useSelector((state) => state.tag.tags);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const handleClearForm = () => {
    setResults([]);
    if (searchType === 'tag') {
      setClickTag(false);
    } else {
      setSearchQuery("");
      setSearchPerformed(false);
    }
  };

  const handleOnClick = async (id) => {
    await dispatch(fetchTagWithHabitGoal(id))
      .unwrap()
      .then((payload) => {
        setResults(payload);
        setClickTag(true);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    // If searchQuery is empty, return early
    if (searchQuery.trim() === "") {
      return;
    }
    setSearchPerformed(true);
    let action;
    if (searchType === "habit") {
      action = await dispatch(searchHabits(searchQuery));
    } else if (searchType === "goal") {
      action = await dispatch(searchGoals(searchQuery));
    }
    if (action.type.endsWith("fulfilled")) {
      setResults(action.payload);
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <FormControl size="small">
          <InputLabel id="search-type-label">Search Type</InputLabel>
          <Select
            labelId="search-type-label"
            id="search-type-select"
            value={searchType}
            label="Search Type"
            onChange={(e) => setSearchType(e.target.value)}
            sx={{ width: 120 }}
          >
            <MenuItem value="habit">Habit</MenuItem>
            <MenuItem value="goal">Goal</MenuItem>
            <MenuItem value="tag">Tag</MenuItem>


          </Select>
        </FormControl>

        {
          searchType === "tag" ? (
            tags.map((tag) => (
              <Chip
                key={tag._id}
                label={tag.name}
                size="small"
                color="primary"
                onClick={() => handleOnClick(tag._id)} />
            ))
          ) : (
            <TextField
              value={searchQuery}
              placeholder="Search..."
              onChange={(event) => setSearchQuery(event.target.value)}
              sx={{ width: 300 }}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit" color="primary" aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        <Tooltip title="Clear">
          <IconButton
            edge="end"
            color="error"
            onClick={handleClearForm}
            aria-label="clear form"
          >
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </form>
      {clickTag === true ?
        (
          <>
            Habibi:
            {results.habits.map((habit, index) => (
              <Box key={index} mb={2}>
                <HabitCard habit={habit} />
              </Box>
            ))}
            Goalie:
            {results.goals.map((goal, index) => (
              <Box key={index} mb={2}>
                <GoalCard goal={goal} />
              </Box>
            ))}
          </>
        ) : null
      }

      {results.length > 0 ? (
        results.map((result, index) => {
          if (searchType === "habit") {
            return (
              <Box key={index} mb={2}>
                <HabitCard habit={result} />
              </Box>
            );
          } else if (searchType === "goal") {
            return (
              <Box key={index} mb={2}>
                <GoalCard goal={result} />
              </Box>
            );
          } else {
            return null; // Add this line
          }
        })
      ) : searchPerformed ? (
        <div>No results found</div>
      ) : null}
    </>
  );
}

export default SearchInput;
