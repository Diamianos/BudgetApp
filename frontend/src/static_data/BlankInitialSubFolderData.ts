import { Folder } from "../components/Folder";

export const BlankInitialSubFolderData = {
	folders: {
		"1": new Folder({
			id: 1,
			draggable_id: "1",
			created_at: "",
			modified_at: "",
			name: "",
			amount: 0,
			balance: 0,
		}),
	},
	columns: {
		"column-1": {
			id: "column-1",
			title: "Days 1-14",
			folderIds: [],
		},
		"column-2": {
			id: "column-2",
			title: "Distribute",
			folderIds: [],
		},
		"column-3": {
			id: "column-3",
			title: "Days 15 - 30",
			folderIds: [],
		},
	},
	// Facilitate reordering of the columns
	columnOrder: ["column-1", "column-2", "column-3"],
};
