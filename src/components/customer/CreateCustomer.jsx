import React from 'react'

const CreateCustomer = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {errorMessage && (
          <Alert severity="error" className="mb-4">
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" className="mb-4">
            {successMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Mobile No or Email"
            variant="outlined"
            fullWidth
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="bg-blue-500 hover:bg-blue-600 text-white"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} className="text-white" /> : "Login"}
          </Button>
          <div>
            <p
              className="hover:text-blue-800 cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Don't have an account? Signup
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomer