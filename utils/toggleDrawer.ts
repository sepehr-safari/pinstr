const toggleDrawer = (drawerId: DrawerId, checked: boolean) => {
  const checkbox = document.getElementById(drawerId) as HTMLInputElement;
  if (!checkbox) return;

  checkbox.checked = checked;
};

export default toggleDrawer;
