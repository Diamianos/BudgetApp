import React from "react";
import { SubFolder } from "./SubFolder";

interface SubFolderListProps {
	subFolders: SubFolder[];
}

function SubFolderList({ subFolders }: SubFolderListProps) {
	return (
		<div>
			{subFolders.map((folder, index) => {
				return <div key={index}>{JSON.stringify(folder)}</div>;
			})}
		</div>
	);
}

export default SubFolderList;
