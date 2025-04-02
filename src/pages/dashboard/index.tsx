

import './styles.css';
import useAction from '@hooks/useAction';
import useSystemStore from '@stores/system';
import getCurrentTheme from '@styles/theme';
import { signIn } from '@actions/user';
import { getAllUsers } from '@actions/admin';
import Layout from '@components/layout';

const Dashboard = () => {
    const store = useSystemStore(x => x);

    const send = () =>
      useAction({
        action: async () => await signIn({ id: "admin", password: "1234"}),
        onError: (error) => console.log("ouve um erro", error),
        callback: (data) => console.log("user", data),
      });

    const profile = () =>
      useAction({
        //action: async () => await createUser({ name: "joao vitor dutra", id: "02"}),
        action: async () => await getAllUsers(),
        onError: (error) => console.log("ouve um erro", error),
        callback: (data) => console.log("user", data),
      });
    
    return (
      <Layout>
        <h1></h1>
        <div className="card">
          <button onClick={send} style={{ background: getCurrentTheme().colors["primary"] }}>
            signin
          </button>

        </div>
        <div className="card">
          <button onClick={profile} style={{ background: getCurrentTheme().colors["primary"] }}>
            update profile
          </button>

        </div>
        <div className="card">
          <button onClick={() => {
            store.updateSystem({
              theme: store.system.theme == "default" ? "light" : (store.system.theme == "dark" ?  "light": "dark")
            })
          }}>
           theme {store.system.theme}
          </button>
        </div>
      </Layout>
    )
};

export default Dashboard;
