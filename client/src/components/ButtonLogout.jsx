import { useContext } from "react";
import { estadoLoginGlobal } from "../context/contexData";
import { Button } from "react-native-paper";

export default function BotonLogout() {
  const { logout } = useContext(estadoLoginGlobal);

  return (
    <Button 
      style={styles.logoutButton}
      onPress={logout} 
      mode="contained"
      icon="logout"
      buttonColor="#EF4444"
      textColor="#FFFFFF"
    >
      Cerrar sesión
    </Button>
  );
}

const styles = {
  logoutButton: {
    borderRadius: 12,
    paddingVertical: 8,
    elevation: 2,
  }
};
