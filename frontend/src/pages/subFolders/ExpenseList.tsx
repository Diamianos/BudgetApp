import { Container } from "@mui/material";
import React from "react";
import { SubFolder } from "./SubFolder";

interface ExpenseListProps {
	selectedRow: SubFolder | undefined;
}

function ExpenseList({ selectedRow }: ExpenseListProps) {
	return (
		<Container
			sx={{
				backgroundColor: "rgba(25, 118, 210, 0.08)",
				maxHeight: "100vh",
				overflow: "auto",
			}}
		>
			{/* Expense List for {selectedRow?.name} */}
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. In eu mi bibendum
			neque egestas. Adipiscing tristique risus nec feugiat in fermentum posuere
			urna nec. Arcu felis bibendum ut tristique et egestas. Malesuada nunc vel
			risus commodo. Eros donec ac odio tempor orci dapibus ultrices in iaculis.
			Porttitor lacus luctus accumsan tortor posuere ac ut consequat. Dignissim
			sodales ut eu sem integer vitae justo. Sed augue lacus viverra vitae
			congue eu consequat. Imperdiet dui accumsan sit amet nulla. Egestas tellus
			rutrum tellus pellentesque. Nisl nisi scelerisque eu ultrices vitae auctor
			eu augue ut. Augue neque gravida in fermentum et sollicitudin ac. Vel eros
			donec ac odio. Cursus sit amet dictum sit amet. Amet venenatis urna cursus
			eget nunc. Pharetra sit amet aliquam id. Facilisi cras fermentum odio eu.
			Ut aliquam purus sit amet luctus venenatis lectus magna. In ornare quam
			viverra orci sagittis eu volutpat odio. Etiam tempor orci eu lobortis
			elementum nibh. Diam vulputate ut pharetra sit amet aliquam id diam
			maecenas. Tortor consequat id porta nibh venenatis cras sed felis eget.
			Tellus orci ac auctor augue. Urna cursus eget nunc scelerisque. Phasellus
			vestibulum lorem sed risus ultricies tristique nulla aliquet enim.
			Tristique risus nec feugiat in fermentum posuere urna nec. Ipsum dolor sit
			amet consectetur adipiscing elit ut. Ut lectus arcu bibendum at varius vel
			pharetra vel. Amet nisl purus in mollis nunc sed id. Dolor sit amet
			consectetur adipiscing elit ut aliquam purus. Felis eget nunc lobortis
			mattis. Nunc non blandit massa enim nec. Nisl suscipit adipiscing bibendum
			est ultricies integer quis. Adipiscing at in tellus integer feugiat
			scelerisque varius morbi. Adipiscing bibendum est ultricies integer quis
			auctor elit sed. Amet venenatis urna cursus eget nunc scelerisque viverra.
			Mauris pellentesque pulvinar pellentesque habitant morbi tristique
			senectus et netus. Nulla porttitor massa id neque aliquam vestibulum. Eget
			nulla facilisi etiam dignissim. Viverra aliquet eget sit amet tellus cras.
			Ac turpis egestas maecenas pharetra convallis posuere morbi. Consequat
			semper viverra nam libero justo laoreet sit amet. Urna condimentum mattis
			pellentesque id nibh tortor id. Velit scelerisque in dictum non
			consectetur a erat. Nibh venenatis cras sed felis eget velit aliquet
			sagittis id. Amet porttitor eget dolor morbi non arcu risus quis. Viverra
			tellus in hac habitasse platea dictumst vestibulum rhoncus. Urna nunc id
			cursus metus aliquam eleifend. Risus commodo viverra maecenas accumsan
			lacus vel facilisis volutpat est. Id ornare arcu odio ut sem nulla.
			Convallis a cras semper auctor neque vitae. Vitae congue eu consequat ac
			felis. Gravida in fermentum et sollicitudin. Nunc sed blandit libero
			volutpat sed cras ornare arcu dui. Nulla facilisi nullam vehicula ipsum.
			Vulputate sapien nec sagittis aliquam malesuada bibendum. Luctus accumsan
			tortor posuere ac ut consequat semper. Cursus risus at ultrices mi tempus.
			Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi.
			Felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices.
			Blandit aliquam etiam erat velit scelerisque in dictum. Viverra accumsan
			in nisl nisi. Ut morbi tincidunt augue interdum velit euismod in. Sem
			fringilla ut morbi tincidunt. Nulla facilisi etiam dignissim diam quis
			enim lobortis scelerisque. Tincidunt vitae semper quis lectus nulla. Quis
			auctor elit sed vulputate mi. Posuere urna nec tincidunt praesent semper
			feugiat nibh sed. A lacus vestibulum sed arcu non odio. Turpis egestas sed
			tempus urna et pharetra pharetra.
		</Container>
	);
}

export default ExpenseList;
