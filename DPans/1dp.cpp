// how to find fibonacci series 
int solveUsingMemoisation(int n, vector<int>&dp){
    if(n==0) return 0; 
    if(n==1) return 1; 

    if(dp[n]!=-1){
        return dp[n]; 
    }
    dp[n]= solveUsingMemoisation(n-1,dp)+ solveUsingMemoisation(n-2,dp); 
    return dp[n]; 
}

int solveUsingTabulation(int n){
    vector<int>dp(n+1, -1);
    dp[0]=0; 
    if(n==0){
        return 0; 
    }
    dp[1]=1; 
    for(int index=2; index<=n; index++){
        dp[index]= dp[index-1]+dp[index-2]; 
    }
    return dp[n]; 
}


// how to find coin change basically loop ke andar se dp lagane wali dp 
int solveUsingRecursion(vector<int>&coins, int amount){
    if(amount==0)
    return 0; 

    int mini=INT_MAX; 
    for(int i=0; i< coins.size(); i++){
        if(amount-coins[i]>=0){
            int recursionkaans= solveUsingRecursion(coins, amount-coins[i]); 
            if(recursionkaans!= INT_MAX){
                int ans=1+ recursionkaans; 
                mini= min(mini, ans); 
            }
        }
        return mini; 
    }
}

int solveUsingTabulation(vector<int>&coins, int amount){
    int n= amount; 
    vector<int>dp(n+1, INT_MAX);
    dp[0]=0; 
     for( int value = 1; value<=amount; value++) {
            int mini = INT_MAX;
            for(int i=0; i<coins.size(); i++) {
            
                if(value - coins[i] >= 0) {
                    int recursionKaAns = dp[value - coins[i] ];
                    
                    if(recursionKaAns != INT_MAX) {
                        
                        int ans = 1 + recursionKaAns;
                        mini  = min(mini, ans);
                    }
                }
            }
            dp[value] = mini;
        }
        return dp[amount];
}

// house rob

int solveUsingRecursion(vector<int>&nums, int index){
    if(index>= nums.size()){
        return 0; 
    }
    int include= nums[index]+ solveUsingRecursion(nums, index+2);
    int exclude= 0+ solveUsingRecursion(nums, index+1); 
    int ans= max(include, exclude); 
    return ans; 
}
int solveUsingTabulation(vector<int>&nums){
    int n= nums.size(); 
    vector<int>dp(n, -1); 
    dp[n-1]= nums[n-1]; 
    for(int index=n-2; index>=0; index--){
        int tempans=0; 
        if(index+2< n){
            tempans= dp[index+2];
        }
        int include= nums[index]+tempAns; 
        int exclude= 0+ dp[index+1] ; 
        dp[index]= max(include, exclude); 
    }
    return dp[0]; 
}

// 0 1 knapsack problem ; 
int solveUsingTabulation(int capacity, int wt[], int profit[], int n) {
	vector<vector<int> > dp(capacity+1, vector<int>(n+1, -1));

	for(int row = 0; row<=capacity; row++) {
		dp[row][n] = 0;
	}

	for(int i=0; i<=capacity; i++) {
		for(int j=n-1; j>=0; j--) {
			int include = 0;
			if(wt[j] <= i) {
				include = profit[j] + dp[i-wt[j]][j+1];
			}
			int exclude = 0 + dp[i][j+1];
			dp[i][j] = max(include, exclude);
		}
	}

	//printdparray(dp);
	return dp[capacity][0];
	
}
// edit distance; 
int solveUsingRecursion(string& a, string&b, int i, int j){
    if(i==a.length()){
        return b.length()-j; 
    }
    if(j==b.length()){
        return a.length()-i; 
    }
    int ans=0; 
    if(a[i]==b[j]) ans= 0+ solveUsingRecursion(a,b, i+1, j+1); 
    else{
        int replace= 1+ solveUsingRecursion(a,b,i+1, j+1);
        int insert=1+ solveUsingRecursion(a,b,i, j+1); 
        int remove= 1+solveUsingRecursion(a,b,i+1, j); 
        ans= min(insert, min(remove, replace)); 
    }
}
int solveUsingTabulation(string a, string b){
    vector<vector<int>>dp(a.length()+1, vector<int>(b.length()+1, -1)); 
    for(int col=0; col<=b.length(); col++){
        dp[a.length()][col]= b.length()-col; 
    }
    for(int row=0; row<=a.length(); row++){
        dp[row][b.length()]= a.length()-row; 
    }
     for(int i_index=a.length()-1; i_index>=0; i_index--) {
            for(int j_index=b.length()-1; j_index>=0; j_index--) {
                int ans = 0;
                if(a[i_index] == b[j_index] ) {
                    ans = 0 + dp[i_index+1][j_index+1];
                }
                else {
                    int replace = 1 + dp[i_index+1][j_index+1];
                    int insert = 1 + dp[i_index][j_index+1];
                    int remove = 1 + dp[i_index+1][j_index];
                    ans = min(insert,min(remove,replace));
                }
                dp[i_index][j_index] = ans;
            }
        }
        return dp[0][0];
}
//LCS

int solveUsingRecursion(string a, string b, int i, int j){
   if( i >= a.length()) {
            return 0;
        }
        if(j >=b.length()) {
            return 0;
        }

        //recursive call
        int ans = 0;
        if(a[i] == b[j]) {
            ans = 1 + solveUsingRecursion(a,b, i+1, j+1);
        }
        else {
            ans = 0 + max(solveUsingRecursion(a,b, i, j+1),
                        solveUsingRecursion(a,b, i+1, j));
        }
        return ans;
}

//LPS 
//same as LCS but taking a string same as the given and reversing it;then
//applying LPS; 


//longest increasing subsequence; 
int solveUsingRecursion(vector<int>&num, int curr, int prev){
    if(curr>=num.size()){
        return 0; 
    }
    int include=0; 
    if(prev==-1 || num[curr]>num[prev]){
        include=1+solveUsingRecursion(num, curr+1, curr); 
    }
    int exclude=0+ solveUsingRecursion(num, curr+1, prev); 
    int ans= max(include, exclude); 
}

//BINARY SEARCH APPLICATION; 
int solveUsingBS(vector<int>&num){
    vector<int>ans; 
    ans.push_back(num[0]);
    for(int i=1; i<num.size(); i++){
        if(num[i]>ans.back()){
            ans.push_back(num[i]); 
        }
        else{
            int index=lower_bound(ans.begin(),ans.end(), num[i])-ans.begin(); 
            ans[index]= num[i]; 
        }
    }
    return ans.size();
}

//higher 



