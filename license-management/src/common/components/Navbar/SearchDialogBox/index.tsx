import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import SearchIcon from '@mui/icons-material/Search';
import styles from './index.module.scss';

export interface DialogProps {
    open: boolean;
    onClose: () => void;
}

function SimpleDialog(props: DialogProps) {
    const { onClose, open } = props;

    const [searchField, setSearchField] = React.useState<string>("");

    const handleClose = () => {
        onClose();
    };

    const handleSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchField(event.target.value);
    }

    const handleEnterKeyForSearch = (event: React.KeyboardEvent) => {
        if(event.key == "Enter"){
            console.log("search in mobile: ", searchField);

            //to close the search filed after pressing enter
            handleClose();
        }
    }

    return (
        <Dialog onClose={handleClose} open={open} >
            <input type='text' placeholder='Search..' className={styles.search} onChange={handleSearchText} onKeyDown={handleEnterKeyForSearch}/>
        </Dialog>
    );
}

function SearchDialogBox() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <SearchIcon onClick={handleClickOpen}/>
            <SimpleDialog
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}

export default SearchDialogBox;
