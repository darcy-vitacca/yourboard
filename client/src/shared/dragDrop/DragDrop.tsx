import {
  useAuthDispatch,
  useAuthState,
} from "../../components/context/context";
import * as linkify from "linkifyjs";
import { useHistory } from "react-router";

export const DragDrop = ({ children }) => {
  const { currentProject } = useAuthState();
  const { push } = useHistory();
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.getData("text")) {
      const link = e?.dataTransfer?.getData("text");
      if (!currentProject) {
        alert("Please select a project and then drop again");
      } else if (linkify.find(link).length < 1) {
        alert("Please drop a valid link");
      } else {
        push({
          pathname: "/add-links",
          state: {
            droppedLink: link,
          },
        });
      }
    } else {
      alert("Please drop a valid link");
    }
  };
  return (
    <div
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      // onDragLeave={(e) => handleDragLeave(e)}
    >
      {children}
    </div>
  );
};
