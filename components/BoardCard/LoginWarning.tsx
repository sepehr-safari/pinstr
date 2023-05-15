const LoginWarning = () => {
  return (
    <div className="toast">
      <div className="alert alert-warning p-2">
        <div>
          <span>You must be logged in to react to boards!</span>
        </div>
      </div>
    </div>
  );
};

export default LoginWarning;
