import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
} from "@mui/material";

interface MonthYearDropDownProps {
	month: string;
	setMonth: (value: string) => void;
	year: string;
	setYear: (value: string) => void;
	handleMonthYearButtonClick: () => void;
}

function MonthYearDropDown({
	month,
	setMonth,
	year,
	setYear,
	handleMonthYearButtonClick,
}: MonthYearDropDownProps) {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const handleMonthChange = (event: SelectChangeEvent) => {
		setMonth(event.target.value as string);
	};

	return (
		<Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
			<FormControl sx={{ minWidth: 120 }}>
				<InputLabel id="simple-select-label">Month</InputLabel>
				<Select
					labelId="simple-select-label"
					id="simple-select"
					value={month}
					label="Month"
					onChange={handleMonthChange}
				>
					{months.map((name) => (
						<MenuItem key={name} value={name}>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<TextField
				variant="outlined"
				type="number"
				label="Year"
				value={year}
				onChange={(e) => {
					setYear(e.target.value);
				}}
				sx={{ marginLeft: ".5rem", marginRight: ".5rem" }}
			></TextField>
			<Button
				variant="contained"
				size="large"
				onClick={handleMonthYearButtonClick}
			>
				Select
			</Button>
		</Box>
	);
}

export default MonthYearDropDown;
