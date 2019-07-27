import React from "react";
import "./Home.css";
import Timer from "./Timer.jsx";
import AddItemModal from "./AddItemModal.jsx";
import CheckDateOops from "../general/CheckDateOops.jsx"
import { observer } from "mobx-react-lite";
import CustomLink from "../general/CustomLink.jsx";

import { date } from "../util/quick.js";
import tagStore from "../stores/tagStore.js";
import ItemList from "./item/ItemList.jsx";

const Home = observer(function Home({ store, dayFromUrl, timeStore }) {
  // always have value in store to day from url
  store.updateDate(dayFromUrl);
  return (
    <CheckDateOops date={dayFromUrl}>
      <div className="App">
        <header className="App-header">
          <p id="currentDate">
            <CustomLink to="/calendar"> {date(new Date(dayFromUrl))}</CustomLink>
          </p>
          <Timer store={store} timeStore={timeStore} />
        </header>

        <section aria-labelledby="remaining-header">
          <h4 id="remaining-header">Remaining</h4>
          {store.unCompletedTodos.length > 0 ?
          <span data-testid="remaining-items">
          {store.unCompletedTodos.map(obj => (
              <ItemList key={"uncompleted-item-list-"+obj.id} timeStore={timeStore} item={obj} store={store} tags={tagStore.tags} />
            ))
        }
          </span>
          :
          null
        }
        </section>

        <section aria-labelledby="completed-header">
          <h4 id="completed-header">Completed</h4>
          { store.completedTodos.length > 0 ?
          <span data-testid="completed-items">
          {store.completedTodos.map(obj => (
              <ItemList key={"completed-item-list-"+obj.id} timeStore={timeStore} item={obj} store={store} tags={tagStore.tags} />
            ))}
          </span>
          :
          null
        }
        </section>
        <AddItemModal addTask={store.addItem} />
      </div>
    </CheckDateOops>
  );
});

export default Home;
